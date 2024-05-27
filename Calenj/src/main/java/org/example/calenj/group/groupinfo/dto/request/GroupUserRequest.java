package org.example.calenj.group.groupinfo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupinfo.domain.GroupUserEntity;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupUserRequest {
    private UUID groupId;
    private String nickName;
    private String userEmail;
    private GroupUserEntity.GroupRoleType groupRoleType;
    private String group_user_location;
}
