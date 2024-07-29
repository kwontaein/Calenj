package org.example.calenj.calendar.dto.response;

import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
public class ScheduleResponse {
    //스케쥴 아이디
    private UUID id;
    //제목
    private String title;
    //시작일
    private Timestamp start;
    //종료일
    private Timestamp end;
    //하루종일
    private boolean allDay;
    //태그 정보

    //추가정보
    private ExtendedPropsResponse extendedProps;

    //java.util.UUID, java.lang.String, java.sql.Timestamp, java.sql.Timestamp, java.lang.Boolean, java.lang.String, java.lang.String, java.lang.String
    public ScheduleResponse(UUID scheduleId, String title, Timestamp start, Timestamp end, boolean allDay, String tag, String formState, String content, String todoList, String friendList) {
        this.id = scheduleId;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.extendedProps = new ExtendedPropsResponse(tag, scheduleId, formState, content, todoList, friendList);  // 객체 초기화
    }
}