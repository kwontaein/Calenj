package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.domain.Group.GroupUserEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupUserDTO {
    private String nickName;
    private String userEmail;
    private GroupUserEntity.GroupRoleType groupRoleType;
    private String group_user_location;

}
