package org.example.calenj.calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
public class RepeatStateResponse {
    private UUID scheduleId;

    private Date startTime;

    private Date endTime;

    private boolean repeat;

    private String repeatOption;

    private String repeatMode;

    private String repeatDeadline;

    private Date repeatEnd;

    private int repeatCount;

    private String repeatWeek;

}
