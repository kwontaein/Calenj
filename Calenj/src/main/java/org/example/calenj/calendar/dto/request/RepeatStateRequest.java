package org.example.calenj.calendar.dto.request;

import lombok.Data;
import org.example.calenj.calendar.domain.RepeatStateEntity;
import org.example.calenj.calendar.domain.UserScheduleEntity;

import java.sql.Date;
import java.util.List;

@Data
public class RepeatStateRequest {
    private UserScheduleEntity scheduleId;

    private Date startTime;

    private Date endTime;

    private boolean repeat;

    private String repeatOption;

    private String repeatMode;

    private String repeatDeadline;

    private Date repeatEnd;

    private int repeatCount;

    private List<String> repeatWeek;

    public RepeatStateEntity toEntity(UserScheduleEntity userScheduleEntity) {
        return RepeatStateEntity
                .builder()
                .scheduleId(userScheduleEntity)
                .startTime(startTime)
                .endTime(endTime)
                .repeat(repeat)
                .repeatOption(repeatOption)
                .repeatMode(repeatMode)
                .repeatDeadline(repeatDeadline)
                .repeatEnd(repeatEnd)
                .repeatCount(repeatCount)
                .repeatWeek(repeatWeek.toString())
                .build();
    }
}
