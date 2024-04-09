package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;


public class GroupNoticeDTO {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private UUID groupId;
        private String noticeCreated;
        private String noticeContent;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private UUID groupId;
        private UUID noticeId;
        private String noticeCreated;
        private String noticeContent;
        private String noticeCreater;
        private List<String> noticeWatcher;

        public Response(UUID noticeId, String noticeContent, String noticeCreater, String noticeCreated) {
            this.noticeContent = noticeContent;
            this.noticeCreater = noticeCreater;
            this.noticeCreated = noticeCreated;
            this.noticeId = noticeId;
        }


        public Response(UUID noticeId, String noticeContent, String noticeCreater, String noticeCreated, List<String> noticeWatcher) {
            this.noticeContent = noticeContent;
            this.noticeCreater = noticeCreater;
            this.noticeCreated = noticeCreated;
            this.noticeWatcher = noticeWatcher;
            this.noticeId = noticeId;
        }
    }


    //noticeTitle, gn.noticeContent, gn.noticeWatcher, gn.noticeCreater, gn.noticeCreated


}
