package org.example.calenj.group.groupschedule.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class GroupSubScheduleResponse {
    private UUID subScheduleId;

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
    //걸리는 시간
    private String duration;

    public GroupSubScheduleResponse(UUID subScheduleId, String scheduleTitle, Timestamp subScheduleCreate, int subScheduleDuration, String subScheduleContent, int index, List<String> joinUser, String location, String positionX, String positionY, String duration) {
        this.subScheduleId = subScheduleId;
        this.subScheduleTitle = scheduleTitle;
        this.subScheduleCreate = subScheduleCreate;
        this.subScheduleDuration = subScheduleDuration;
        this.subScheduleContent = subScheduleContent;
        this.index = index;
        this.joinUser = joinUser;
        this.location = location;
        this.positionX = positionX;
        this.positionY = positionY;
        this.duration = duration;
    }
}
