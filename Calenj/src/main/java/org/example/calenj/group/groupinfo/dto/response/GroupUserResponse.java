package org.example.calenj.group.groupinfo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupinfo.domain.GroupUserEntity;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupUserResponse {

    private UUID groupId;
    private String nickName;
    private String userEmail;
    private GroupUserEntity.GroupRoleType groupRoleType;
    private String group_user_location;

    public GroupUserResponse(String userEmail, String nickName, GroupUserEntity.GroupRoleType groupRoleType, String group_user_location) {
        this.userEmail = userEmail;
        this.nickName = nickName;
        this.groupRoleType = groupRoleType;
        this.group_user_location = group_user_location;
    }


}
