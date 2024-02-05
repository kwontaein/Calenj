package org.example.calenj.Main.DTO;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class ValidateDTO {
    private String email;
    private String code;
}
