package org.example.calenj.calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class RepeatStateResponse {
    private String scheduleId;

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
