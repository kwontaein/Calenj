package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


public class InviteCodeDTO {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request {
        private UUID groupId;
        private String inviteCode;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private UUID groupId;
        private String inviter;
        private String inviteCode;
        private String endDateTime;
        private int useCount;
        private int maxUseAble;
        // --------임의 추가 변수
        private String groupTitle;
        private int onlineCount;
        private int memberCount;
        private String ableCode;

        public Response(UUID groupId, String groupTitle, String nickname, String endDateTime, int useAbleCount, int maxUseAble) {
            this.groupId = groupId;
            this.groupTitle = groupTitle;
            this.inviter = nickname;
            this.endDateTime = endDateTime;
            this.useCount = useAbleCount;
            this.maxUseAble = maxUseAble;
        }

        public Response(String nickname, String inviteCode, String endDateTime, int useCount) {
            this.inviter = nickname;
            this.inviteCode = inviteCode;
            this.endDateTime = endDateTime;
            this.useCount = useCount;
        }
    }


}
