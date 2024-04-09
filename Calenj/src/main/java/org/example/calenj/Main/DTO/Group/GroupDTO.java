package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


public class GroupDTO {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private String groupTitle;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private UUID groupId;
        private String groupTitle;
        private String groupCreated;
        private String groupCreater;

        //jpa의 jpql은 DTO를 통해 조회할 경우 생성자를 생성해줘야 함
        public Response(UUID groupId, String groupTitle) {
            this.groupId = groupId;
            this.groupTitle = groupTitle;
        }
    }


}
