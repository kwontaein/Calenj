package org.example.calenj.global.auth.dto.request;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class ValidateRequest {
    private String email;
    private String code;
    private String dateTime;
}

