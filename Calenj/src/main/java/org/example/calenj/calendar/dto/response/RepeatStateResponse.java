package org.example.calenj.calendar.dto.response;

import lombok.Data;
import org.example.calenj.calendar.domain.UserScheduleEntity;

import java.sql.Date;

@Data
public class RepeatStateResponse {
    private UserScheduleEntity scheduleId;

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
