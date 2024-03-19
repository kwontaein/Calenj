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

import java.util.Random;
import java.util.UUID;
import java.util.stream.Stream;

@Service

public class EmailVerificationService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    private final JavaMailSender mailSender;
    private final String setFrom;

    //email 인증 토큰을 저장하는 컬렉션


    @Autowired
    ValidateDTO validateDTO;


    private EmailVerificationService(JavaMailSender mailSender, @Value("${spring.mail.username}") String setFrom) {
        this.mailSender = mailSender;
        this.setFrom = setFrom;
    }

    //인증번호 발급 메소드
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

        //인증번호 발급 이후 EnableSendEmail =SUCCESS
        validateDTO.setEnableSendEmail(ValidateDTO.EnableSendEmail.SUCCESS);
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

    //front에서 보낸 인증코드 체크
    public void checkValidationCode(String validationCode, HttpServletRequest request, HttpServletResponse response) {
        String code = validateDTO.getCode();

        if (!validationCode.equals("")) { //인증코드가 입력되지 않으면

            //이메일 토큰검증
            boolean enableEmailToken = emailTokenValidation(request, response);

            if (!enableEmailToken) { //이메일토큰 재발급 가능 시 true 유효하면 false

                if (validationCode.equals(code)) {
                    validateDTO.setEmailValidState(ValidateDTO.EmailValidState.SUCCESS);

                    return;

                } else {
                    validateDTO.setEmailValidState(ValidateDTO.EmailValidState.FAIL);
                    return;
                }
            }
            //쿠키가 만료되면
            validateDTO.setEmailValidState(ValidateDTO.EmailValidState.RETRY);
            return;
        }
        //인증코드에 아무것도 입력하지 않으면
        validateDTO.setEmailValidState(ValidateDTO.EmailValidState.INITIAL);
    }


    //토큰 발급 (발급 전 토큰 유효기간 체크)
    public boolean generateEmailValidateToken(HttpServletRequest request, HttpServletResponse response) { // UUID를 통한 시간제한 토큰 생성

        boolean enableSendEmail = emailTokenValidation(request, response);

        if (enableSendEmail) { //발급 가능하면 토큰발급

            String token = UUID.randomUUID().toString();
            // 5분 유효한 토큰
            long validityInMilliseconds = (1000 * 60 * 5) + 4000; //5분 + 서버 통신시간 4초
            long expirationTime = System.currentTimeMillis() + validityInMilliseconds;

            validateDTO.setEmailToken(token);
            validateDTO.setExpirationTime(expirationTime);
            validateDTO.setEmailValidState(ValidateDTO.EmailValidState.INITIAL); //코드 발급 이후엔 인증대기 상태


            Cookie cookie = new Cookie("enableSendEmail", token);  //UUID값을 넣음
            response.addCookie(cookie);

            return true; //이메일 토큰 반환 후 ture 반환
        }
        //만약 이메일 인증 토큰이 유효할 시 EnableSendEmail= FAIL
        validateDTO.setEnableSendEmail(ValidateDTO.EnableSendEmail.FAIL);
        return false;

    }


    //이메일 토큰시간 검증 및 삭제
    public boolean emailTokenValidation(HttpServletRequest request, HttpServletResponse response) {

        String emailTokenUUID = validateDTO.getEmailToken();

        //쿠키 값이 존재하는지 확인
        if (request.getCookies() != null) {
            Cookie[] requestCookie = request.getCookies();

            Cookie enableSendEmail = Stream.of(requestCookie)
                    .filter(cookieName -> cookieName.getName().equals("enableSendEmail"))
                    .findFirst()
                    .orElse(null);


            //UUID를 비교함 같으면 유효한 코인
            if (enableSendEmail.getValue().equals(emailTokenUUID)) {
                Long expirationTime = validateDTO.getExpirationTime();//UUID로 token의 유효기간을 가져옴
                //토큰 유효기간 체크 , 시간이 유효할 경우
                if (expirationTime != null && expirationTime > System.currentTimeMillis()) {

                    return false; // 토큰기간 유효 -> 재발급 불가능

                } else {
                    //쿠키도 삭제해줌
                    validateDTO.clear();
                    userService.removeCookie(response, "enableSendEmail");
                    return true; //토큰만료 -> 재발급 가능
                }
            }
        }
        /**쿠키엔 토큰이 없으나 DTO에는 있으면 쿠키 복구**/
        if (emailTokenUUID != null) {
            Cookie cookie = new Cookie("enableSendEmail", validateDTO.getEmailToken());
            response.addCookie(cookie);
            return false;
        }
        return true;

    }


    //이메일 중복체크
    public boolean emailDuplicated(String email) {

        UserEntity user = userRepository.findByUserEmail(email).orElse(null);
        //DB에 해당 이메일이 존재하지 않을경우
        if (user == null) {
            return true;
        } else { //이메일 중복 시
            validateDTO.setEnableSendEmail(ValidateDTO.EnableSendEmail.DUPLICATE);
            return false;
        }
    }
}