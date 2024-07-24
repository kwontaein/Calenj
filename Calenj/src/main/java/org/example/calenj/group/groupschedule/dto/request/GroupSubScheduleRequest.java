package org.example.calenj.group.groupschedule.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupschedule.domain.GroupScheduleEntity;
import org.example.calenj.group.groupschedule.domain.GroupSubScheduleEntity;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupSubScheduleRequest {

    private UUID subScheduleId;

    private UUID scheduleId;

    private String scheduleTitle;

    private Timestamp scheduleCreate;

    private int scheduleDuration;

    private String scheduleContent;

    private int index;

    private String joinUser;

    public GroupSubScheduleEntity toEntity(GroupScheduleEntity groupScheduleId) {
        return GroupSubScheduleEntity.builder()
                .groupSubScheduleId(subScheduleId)
                .groupScheduleId(groupScheduleId)
                .scheduleTitle(scheduleTitle)
                .scheduleCreate(scheduleCreate)
                .scheduleDuration(scheduleDuration)
                .scheduleContent(scheduleContent)
                .index(index)
                .joinUser(joinUser)
                .build();
    }
}
