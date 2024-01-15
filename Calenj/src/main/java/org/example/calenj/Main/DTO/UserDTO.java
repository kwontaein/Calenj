package org.example.calenj.Main.DTO;

import lombok.Data;
import org.example.calenj.Main.domain.User;

@Data
public class UserDTO {
    private int user_id;
    private String account_id;
    private String user_password;
    private String user_email;
    private String user_phone;
    private boolean naver_login;
    private boolean kakao_login;


    public User toEntity() {
        return User.builder()
                .user_id(user_id)
                .account_id(account_id)
                .user_password(user_password)
                .user_email(user_email)
                .user_phone(user_phone)
                .naver_login(naver_login)
                .kakao_login(kakao_login)
                .build();
    }
}
