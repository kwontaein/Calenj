package org.example.calenj.calendar.dto.response;

import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
public class ScheduleResponse {
    //스케쥴 아이디
    private UUID scheduleId;
    //개인 스케쥴 아이디
    private String id;
    //제목
    private String title;
    //시작일
    private Timestamp start;
    //종료일
    private Timestamp end;
    //하루종일
    private boolean allDay;
    //추가정보
    private ExtendedPropsResponse extendedProps;

    public ScheduleResponse(UUID scheduleId, String id, String title, Timestamp start, Timestamp end, boolean allDay, ExtendedPropsResponse extendedProps) {
        this.scheduleId = scheduleId;
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.extendedProps = extendedProps;
    }
}