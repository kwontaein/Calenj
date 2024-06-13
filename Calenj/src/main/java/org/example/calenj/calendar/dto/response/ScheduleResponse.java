package org.example.calenj.calendar.dto.response;

import lombok.Data;
import org.example.calenj.calendar.domain.TagEntity;

import java.sql.Timestamp;
import java.util.List;
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
    //태그 정보
    private List<TagEntity> tag;
    //추가정보
    private ExtendedPropsResponse extendedProps;

    public ScheduleResponse(UUID scheduleId, String personalId, String title, Timestamp start, Timestamp end, boolean allDay, List<TagEntity> tag) {
        this.scheduleId = scheduleId;
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.tag = tag;
    }

    public ScheduleResponse(UUID scheduleId, String id, String title, Timestamp start, Timestamp end, boolean allDay, List<TagEntity> tag, String formState, String content, String todoList) {
        this.scheduleId = scheduleId;
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.tag = tag;
        this.extendedProps.setFormState(formState);
        this.extendedProps.setContent(content);
        this.extendedProps.setTodoList(todoList);
    }
}