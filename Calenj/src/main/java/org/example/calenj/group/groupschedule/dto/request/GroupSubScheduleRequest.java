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

    private String subScheduleTitle;

    private Timestamp subScheduleCreate;

    private int subScheduleDuration;

    private String subScheduleContent;

    private int index;

    private String joinUser;

    public GroupSubScheduleEntity toEntity(GroupScheduleEntity groupScheduleId) {
        return GroupSubScheduleEntity.builder()
                .subScheduleId(subScheduleId)
                .groupScheduleId(groupScheduleId)
                .subScheduleTitle(subScheduleTitle)
                .subScheduleCreate(subScheduleCreate)
                .subScheduleDuration(subScheduleDuration)
                .subScheduleContent(subScheduleContent)
                .index(index)
                .joinUser(joinUser)
                .build();
    }
}
