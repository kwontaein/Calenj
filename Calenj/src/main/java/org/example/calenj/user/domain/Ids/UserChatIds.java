package org.example.calenj.user.domain.Ids;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.user.domain.UserEntity;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserChatIds implements Serializable {
    private UserEntity ownUserId;
}
