package org.example.calenj.Main.DTO.Request.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.domain.Group.GroupUserEntity;

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



