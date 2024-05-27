package org.example.calenj.group.groupschedule.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupinfo.domain.GroupUserEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupScheduleRequest {
    private String groupScheduleTitle;
    private String groupScheduleContent;
    private String groupScheduleLocation;
    private String groupScheduleId;
    private GroupUserEntity groupUser;
}



