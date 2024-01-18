package org.example.calenj.Main.DTO;

import lombok.Data;
import org.example.calenj.Main.domain.UserEntity;

@Data
public class UserDTO {
    private String accountid;
    private String user_password;
    private String user_email;
    private String user_phone;
    private String user_join_date;
    private String user_role;

    public UserEntity toEntity() {
        return UserEntity.builder()
                .accountid(accountid)
                .user_password(user_password)
                .user_email(user_email)
                .user_phone(user_phone)
                .user_join_date(user_join_date)
                .user_role(user_role)
                .build();
    }

}
