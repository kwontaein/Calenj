package org.example.calenj.global.auth.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
@Data
public class ValidateResponse {
    private String email;
    private String code;
    private String dateTime;
    private sendState state;
    private int count;

    @Getter
    @RequiredArgsConstructor
    public enum sendState { //enum을 활용한 권한종류 설정
        EMAIL_DUPLICATED("이메일 중복"),
        RESEND_COUNT_MAX("재전송 횟수 초과"),
        UNKNOWN("알수 없는 오류"),
        SUCCESS("전송 성공");
        private final String status;

        @JsonCreator
        public static ValidateResponse.sendState statusTypeParsing(String inputValue) {
            return Stream.of(ValidateResponse.sendState.values())
                    .filter(statusType -> statusType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(null);
        }
    }
}

