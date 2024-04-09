package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.example.calenj.Main.domain.UserEntity;

import java.util.UUID;


public class GroupUserDTO {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private UUID groupId;
        private String nickName;
        private String userEmail;
        private GroupUserEntity.GroupRoleType groupRoleType;
        private UserEntity.OnlineStatus onlineStatus;
        private String group_user_location;

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private UUID groupId;
        private String nickName;
        private String userEmail;
        private GroupUserEntity.GroupRoleType groupRoleType;
        private UserEntity.OnlineStatus onlineStatus;
        private String group_user_location;

        public Response(String userEmail, String nickName, UserEntity.OnlineStatus onlineStatus, GroupUserEntity.GroupRoleType groupRoleType, String group_user_location) {
            this.userEmail = userEmail;
            this.nickName = nickName;
            this.onlineStatus = onlineStatus;
            this.groupRoleType = groupRoleType;
            this.group_user_location = group_user_location;
        }
    }


}
