package org.example.calenj.calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleResponse {
    private UUID scheduleId;
    //제목
    private String userScheduleTitle;
    //내용
    private String userScheduleContent;
    //시작일
    private Timestamp ScheduleStartDateTime;
    //종료일
    private Timestamp ScheduleEndDateTime;
    //반복여부
    private boolean ScheduleRepeat;
    //반복 기간
    private boolean ScheduleRepeatPeriod;
    //반복 주기
    private int ScheduleRepeatDelay;
}
