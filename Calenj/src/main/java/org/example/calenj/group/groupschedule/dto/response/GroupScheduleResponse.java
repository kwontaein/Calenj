package org.example.calenj.group.groupschedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupinfo.domain.GroupUserEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupScheduleResponse {


    private String groupScheduleTitle;
    private String groupScheduleContent;
    private String groupScheduleLocation;
    private String groupScheduleId;
    private GroupUserEntity groupUser;


//    public GroupScheduleDTO(String groupScheduleTitle, String groupScheduleContent, String groupScheduleLocation,String groupScheduleId){
//        this.groupScheduleTitle = groupScheduleTitle;
//        this.groupScheduleContent = groupScheduleContent;
//        this.groupScheduleLocation = groupScheduleLocation;
//        this.groupScheduleId = groupScheduleId;
//    }
}



