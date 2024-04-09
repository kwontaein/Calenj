package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.domain.Group.GroupUserEntity;


public class GroupScheduleDTO {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private String groupScheduleTitle;
        private String groupScheduleContent;
        private String groupScheduleLocation;
        private String groupScheduleId;
        private GroupUserEntity groupUser;

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String groupScheduleTitle;
        private String groupScheduleContent;
        private String groupScheduleLocation;
        private String groupScheduleId;
        private GroupUserEntity groupUser;

    }


//    public GroupScheduleDTO(String groupScheduleTitle, String groupScheduleContent, String groupScheduleLocation,String groupScheduleId){
//        this.groupScheduleTitle = groupScheduleTitle;
//        this.groupScheduleContent = groupScheduleContent;
//        this.groupScheduleLocation = groupScheduleLocation;
//        this.groupScheduleId = groupScheduleId;
//    }
}



