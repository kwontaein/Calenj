package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.example.calenj.Main.domain.UserEntity;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupUserDTO {
    private UUID groupId;
    private String nickName;
    private String userEmail;
    private GroupUserEntity.GroupRoleType groupRoleType;
    private UserEntity.OnlineStatus onlineStatus;
    private String group_user_location;

    public GroupUserDTO(String nickName, UserEntity.OnlineStatus onlineStatus, GroupUserEntity.GroupRoleType groupRoleType, String group_user_location) {
        this.nickName = nickName;
        this.onlineStatus = onlineStatus;
        this.groupRoleType = groupRoleType;
        this.group_user_location = group_user_location;
    }

}
