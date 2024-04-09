package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


public class GroupCommentDTO {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private UUID groupId;
        private int comment_id;
        private String commented_by;
        private String comment_user;
        private String comment_content;
        private String comment_date;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private UUID groupId;
        private int comment_id;
        private String commented_by;
        private String comment_user;
        private String comment_content;
        private String comment_date;
    }


}
