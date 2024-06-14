package org.example.calenj.calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@AllArgsConstructor
public class RepeatStateResponse {
    private UUID scheduleId;

    private Timestamp startTime;

    private Timestamp endTime;

    private boolean repeat;

    private String repeatOption;

    private String repeatMode;

    private String repeatDeadline;

    private Timestamp repeatEnd;

    private int repeatCount;

    private String repeatWeek;

}
