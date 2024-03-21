package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.domain.Group.GroupUserEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupUserDTO {
    private String nickName;
    private String userEmail;
    private GroupUserEntity.GroupRoleType groupRoleType;


    public GroupUserDTO(String nickName, GroupUserEntity.GroupRoleType groupRoleType, String group_user_location) {
        this.nickName = nickName;
        this.groupRoleType = groupRoleType;
        this.group_user_location = group_user_location;
    }   private String group_user_location;

}
