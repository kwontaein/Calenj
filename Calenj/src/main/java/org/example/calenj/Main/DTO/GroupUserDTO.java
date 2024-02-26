package org.example.calenj.Main.DTO;

import lombok.Data;
import org.example.calenj.Main.domain.Group.GroupUserEntity;

@Data
public class GroupUserDTO {
    private String nickName;
    private String userEmail;
    private GroupUserEntity.GroupRoleType groupRoleType;
    private String group_user_location;

    public GroupUserDTO(String nickName, GroupUserEntity.GroupRoleType GroupRoleType, String group_user_location) {
        this.nickName = nickName;
        this.groupRoleType = GroupRoleType;
        this.group_user_location = group_user_location;
    }
}
