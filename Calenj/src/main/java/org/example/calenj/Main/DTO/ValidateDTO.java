package org.example.calenj.Main.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.stream.Stream;

@Component
@Data
public class ValidateDTO {
    private String email;
    private String code;
    private String emailToken;
    private EmailValidState emailValidState;

    @Getter
    @RequiredArgsConstructor
    public enum EmailValidState {

        INITIAL(100, "응답대기"),
        SUCCESS(200,"성공"),
        FAIL(500,"실패"),
        RETRY(300,"재발급");

        private final Integer code;
        private final String state;


    }
}

