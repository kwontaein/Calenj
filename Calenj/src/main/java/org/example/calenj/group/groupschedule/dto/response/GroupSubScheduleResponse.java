package org.example.calenj.group.groupschedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupSubScheduleResponse {
    private UUID subScheduleId;

    private String scheduleTitle;

    private Timestamp subScheduleCreate;

    private int subScheduleDuration;

    private String subScheduleContent;

    private int index;

    private String joinUser;
}
