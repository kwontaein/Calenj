package org.example.calenj.Main.model;

import jakarta.mail.internet.MimeMessage;
import org.example.calenj.Main.DTO.ValidateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailVerificationService {

    private final JavaMailSender mailSender;
    private final String setFrom;

    private final Map<String, Long> tokenExpirationMap = new ConcurrentHashMap<>();

    @Autowired
    ValidateDTO validateDTO;

    @Autowired
    public EmailVerificationService(JavaMailSender mailSender,
                                    @Value("${spring.mail.username}") String setFrom) {
        this.mailSender = mailSender;
        this.setFrom = setFrom;
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

    public String generateEmailValidateToken() { // UUID를 통한 시간제한 토큰 생성
        String token = UUID.randomUUID().toString();
        // 5분 유효한 토큰
        long validityInMilliseconds = 300000;
        long expirationTime = System.currentTimeMillis() + validityInMilliseconds;
        tokenExpirationMap.put(token, expirationTime);
        return token;
    }

    public boolean emailTokenValidate(String token) {
        Long expirationTime = tokenExpirationMap.get(token);
        if (expirationTime != null && expirationTime > System.currentTimeMillis()) {
            System.out.println("5분간 재전송 불가능");
            return true;
        } else {
            System.out.println("토큰 시간 지남");
            tokenExpirationMap.remove(token);
            return false;
        }
    }
}
