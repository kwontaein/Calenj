package org.example.calenj.Main.DTO.Request.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.example.calenj.Main.domain.UserEntity;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupUserRequest {
    private UUID groupId;
    private String nickName;
    private String userEmail;
    private GroupUserEntity.GroupRoleType groupRoleType;
    private UserEntity.OnlineStatus onlineStatus;
    private String group_user_location;
}
