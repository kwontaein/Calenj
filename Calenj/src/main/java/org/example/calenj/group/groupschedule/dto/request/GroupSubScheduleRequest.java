package org.example.calenj.group.groupschedule.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupschedule.domain.GroupScheduleEntity;
import org.example.calenj.group.groupschedule.domain.GroupSubScheduleEntity;

import java.sql.Timestamp;
import java.util.List;
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

    private List<String> joinUser;
    //위치정보
    private String location;

    public GroupSubScheduleEntity toEntity(GroupScheduleEntity groupScheduleId) {
        return GroupSubScheduleEntity.builder()
                .subScheduleId(subScheduleId)
                .scheduleId(groupScheduleId)
                .subScheduleTitle(subScheduleTitle)
                .subScheduleCreate(subScheduleCreate)
                .subScheduleDuration(subScheduleDuration)
                .subScheduleContent(subScheduleContent)
                .index(index)
                .joinUser(joinUser.toString())
                .subScheduleLocate(location)
                .build();
    }
}
