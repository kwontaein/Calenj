package org.example.calenj.Main.model;

import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.calenj.Main.DTO.ValidateDTO;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

@Service
public class EmailVerificationService {

    private final JavaMailSender mailSender;
    private final String setFrom;

    private final Map<String, Long> tokenExpirationMap = new ConcurrentHashMap<>();

    @Autowired
    ValidateDTO validateDTO;
    @Autowired
    UserRepository userRepository;

    @Autowired
    public EmailVerificationService(JavaMailSender mailSender,
                                    @Value("${spring.mail.username}") String setFrom) {
        this.mailSender = mailSender;
        this.setFrom = setFrom;
    }

    public boolean checkValidationCode(String validationCode) {
        String code = validateDTO.getCode();

        if (validationCode.equals(code)) {
            System.out.println("이메일 인증이 완료되었습니다.");
            return true;
        }
        return false;
    }

    public String joinEmail(String email) {
        String authNumber = makeRandomNumber();
        validateDTO.setEmail(email);
        validateDTO.setCode(authNumber);

        String toMail = email;
        String title = "회원 가입 인증 이메일 입니다.";
        String content = "방문해주셔서 감사합니다.<br><br>" +
                "인증 번호는 " + authNumber + "입니다.<br>" +
                "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
        mailSend(toMail, title, content);
        return authNumber;
    }

    private String makeRandomNumber() {
        Random r = new Random();
        return Integer.toString(r.nextInt(888888) + 111111);
    }

    public void mailSend(String toMail, String title, String content) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setFrom(setFrom);
            helper.setTo(toMail);
            helper.setSubject(title);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //토큰 유효기간 검증

    public void generateEmailValidateToken(HttpServletRequest request, HttpServletResponse response) { // UUID를 통한 시간제한 토큰 생성

        boolean enableSendEmail = emailTokenValidateTimeCheck(request, response);
        System.out.println("enableSendEmail : " + enableSendEmail);
        if (enableSendEmail) { //발급 가능하면 토큰발급

            String token = UUID.randomUUID().toString();
            // 5분 유효한 토큰
            long validityInMilliseconds = 300000;
            long expirationTime = System.currentTimeMillis() + validityInMilliseconds;
            System.out.print("이메일 인증토큰 발급합니다. ");
            System.out.println("이메일 인증토큰 유효시간 : " + expirationTime);

            tokenExpirationMap.put(token, expirationTime);
            Cookie cookie = new Cookie("enableSendEmail", token);
            response.addCookie(cookie);
        }

    }


    public boolean emailTokenValidateTimeCheck(HttpServletRequest request, HttpServletResponse response) {

        Cookie enableSendEmail = Stream.of(request.getCookies())
                .filter(cookieName -> cookieName.getName().equals("enableSendEmail"))
                .findFirst()
                .orElse(null);
        System.out.println("enableSendEmail :" + enableSendEmail);
        System.out.println("enableSendEmailTime: " + tokenExpirationMap.get(enableSendEmail.getValue()));

        if (enableSendEmail != null) {
            String emailToken = enableSendEmail.getValue(); //key = UUID

            Long expirationTime = tokenExpirationMap.get(emailToken);//UUID token의 유효기간

            //토큰 유효기간 체크
            if (expirationTime != null && expirationTime > System.currentTimeMillis()) {

                System.out.println("이메일 토큰 시간이 유효합니다." + System.currentTimeMillis());
                return false; // 토큰기간 유효 -> 재발급 불가능

            } else {

                System.out.println("이메일 토큰 시간이 만료되어 재발급합니다.");
                tokenExpirationMap.remove(emailToken);
                //쿠키도 삭제해줌
                Cookie cookie = new Cookie("enableSendEmail", null);
                cookie.setMaxAge(0);
                cookie.setPath("/");
                response.addCookie(cookie);


                return true; //토큰만료 -> 재발급 가능
            }
        }

        //쿠키에서 받은 값 자체가 없는 경우, but 컬렉션엔 저장된 토큰이 있으면(쿠키를 의도적으로 삭제한 경우 컬렉션에서 찾아서 다시 쿠키로 넣어줌
        Iterator<String> keys = tokenExpirationMap.keySet().iterator();

        while (keys.hasNext()) {
            String key = keys.next();
            //   Long value = tokenExpirationMap.get(key);
            Cookie cookie = new Cookie("enableSendEmail", key);
            response.addCookie(cookie);
            return false;
        }
        return true;

    }

    public boolean emailDuplicated(String email) {

        UserEntity user = userRepository.findByUserEmail(email).orElse(null);
        System.out.println(email);

        if (user == null) {
            System.out.println(user);
            return true;
        } else {
            System.out.println(user);
            return false;
        }
    }
}