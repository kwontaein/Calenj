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
    //위치정보 x
    private String positionX;
    //위치정보 y
    private String positionY;
    private String duration;

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
                .positionX(positionX)
                .positionY(positionY)
                .duration(duration)
                .build();
    }
}
