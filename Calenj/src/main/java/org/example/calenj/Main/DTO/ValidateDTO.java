package org.example.calenj.Main.DTO;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
@Data
public class ValidateDTO {
    private String email;
    private String code;
    private String emailToken;
    private Long expirationTime;
    private EmailValidState emailValidState = EmailValidState.INITIAL;
    private EnableSendEmail enableSendEmail = EnableSendEmail.INITIAL;

    @Getter
    @RequiredArgsConstructor
    public enum EmailValidState {

        INITIAL(100, "응답대기"),
        SUCCESS(200, "성공"),
        FAIL(500, "실패"),
        RETRY(300, "재발급");

        private final Integer code;
        private final String state;

    }

    @Getter
    @RequiredArgsConstructor
    public enum EnableSendEmail {
        INITIAL(100, "응답대기"),
        SUCCESS(200, "이메일 인증코드가 발급되었습니다."),
        FAIL(300, "이메일 인증코드는 5분에 한 번 보낼 수 있습니다. 잠시후 다시 시도해 주세요."),
        DUPLICATE(500, "이미 가입된 이메일입니다.");


        private final Integer code;
        private final String state;

        @JsonValue
        public Object getEnableEmailEnum() {
            Map<String, Object> emailEnum = new LinkedHashMap<>();
            emailEnum.put("code", code);
            emailEnum.put("state", state);
            return emailEnum;
        }
    }

    public void clear() {
        this.emailToken = null;
        this.expirationTime = null;
        // 기본값으로 초기화 또는 원하는 값으로 설정
    }

}

