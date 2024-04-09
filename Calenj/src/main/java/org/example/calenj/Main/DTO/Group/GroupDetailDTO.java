package org.example.calenj.Main.DTO.Group;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;


public class GroupDetailDTO {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private UUID groupId;
        private String groupTitle;
        private String groupCreated;
        private String groupCreater;
        private List<GroupUserDTO.Response> members; //Group_UserEntity에서 목록으로 가져오기
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {


        private UUID groupId;
        private String groupTitle;
        private String groupCreated;
        private String groupCreater;
        private List<GroupUserDTO.Response> members; //Group_UserEntity에서 목록으로 가져오기
    }
}
