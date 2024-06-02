package org.example.calenj.global.auth;

import jakarta.mail.internet.MimeMessage;
import org.example.calenj.global.auth.dto.request.ValidateRequest;
import org.example.calenj.global.auth.dto.response.ValidateResponse;
import org.example.calenj.global.service.RedisService;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.repository.UserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import static org.example.calenj.global.auth.dto.response.ValidateResponse.sendState.*;

@Service
public class EmailVerificationService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final RedisService redisService;
    private final String setFrom;

    private EmailVerificationService(UserRepository userRepository, JavaMailSender mailSender, RedisService redisService, @Value("${spring.mail.username}") String setFrom) {
        this.redisService = redisService;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
        this.setFrom = setFrom;
    }

    private static final int MAX_RESEND_COUNT = 5;
    private static final int RESEND_COOL_DOWN_MINUTES = 30;


    /**
     * 이메일 인증번호 발급
     */
    public ValidateResponse joinEmail(String email) {
        ValidateResponse validateResponse = new ValidateResponse();
        //이메일 중복?
        if (!emailDuplicated(email)) {
            validateResponse.setState(EMAIL_DUPLICATED);
            return validateResponse;
        }

        //재전송 횟수 초과?
        if (!emailSendValidation(email)) {
            validateResponse.setState(RESEND_COUNT_MAX);
            return validateResponse;
        }
        //전송할 내용
        String authNumber = makeRandomNumber();
        String title = "회원 가입 인증 이메일 입니다.";
        String content = "방문해주셔서 감사합니다.<br><br>" +
                "인증 번호는 " + authNumber + "입니다.<br>" +
                "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
        System.out.println("authNumber : " + authNumber);
        validateResponse.setCount(redisService.saveVerificationCode(email, authNumber));
        //전송 상태 반환
        return mailSend(email, title, content, validateResponse);
    }


    /**
     * 이메일 보내기
     */
    public ValidateResponse mailSend(String toMail, String title, String content, ValidateResponse validateResponse) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setFrom(setFrom);
            helper.setTo(toMail);
            helper.setSubject(title);
            helper.setText(content, true);
            mailSender.send(message);
            validateResponse.setState(SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
            validateResponse.setState(UNKNOWN);
        }
        return validateResponse;
    }

    /**
     * 클라이언트가 보낸 인증번호 체크
     */
    public boolean checkValidationCode(@NotNull ValidateRequest validateRequest) {
        Map<Object, Object> verificationData = redisService.getVerificationData(validateRequest.getEmail());
        // Map 에서 code 값을 추출
        String verificationCode = (String) verificationData.get("code");
        if (verificationCode != null) {
            return validateRequest.getCode().equals(verificationCode);
        } else {
            return false;
        }
    }


    /**
     * 이메일 재발급 가능 여부 따지기
     */
    public boolean emailSendValidation(String email) {

        Map<Object, Object> verificationData = redisService.getVerificationData(email);
        Integer count = (Integer) verificationData.get("count");
        int attemptCount = count != null ? count : 0;

        if (attemptCount < MAX_RESEND_COUNT) {
            System.out.println("Attempt Count: " + attemptCount + "\n카운트가 " + MAX_RESEND_COUNT + "회 이하이므로 전송");

            return true;
        } else {
            System.out.println("Attempt Count: " + attemptCount + "\n카운트가 " + MAX_RESEND_COUNT + "회 초과이므로 전송 불가. " + RESEND_COOL_DOWN_MINUTES + "분 카운트 후 재시도 가능");
            return false;
        }
    }


    /**
     * 이메일 인증번호 생성
     * 숫자와 문자가 섞인 6글자의 무작위 문자열을 반환
     */
    private String makeRandomNumber() {
        // 숫자와 소문자를 포함하는 문자열
        String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder result = new StringBuilder(6);

        for (int i = 0; i < 6; i++) {
            // 문자열에서 무작위 인덱스의 문자를 선택
            int index = ThreadLocalRandom.current().nextInt(characters.length());
            result.append(characters.charAt(index));
        }

        return result.toString();
    }

    /**
     * 이메일 중복체크
     *
     * @param email 이메일
     */
    public boolean emailDuplicated(String email) {
        UserEntity user = userRepository.findByUserEmail(email).orElse(null);
        return user == null;
    }


}