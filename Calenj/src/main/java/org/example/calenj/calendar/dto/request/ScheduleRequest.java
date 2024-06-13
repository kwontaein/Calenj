package org.example.calenj.calendar.dto.request;

import lombok.Data;
import org.example.calenj.calendar.domain.TagEntity;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.user.domain.UserEntity;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
public class ScheduleRequest {

    private UUID scheduleId;

    private String id;

    private List<UUID> tagId;

    private String title;

    private Timestamp start;

    private Timestamp end;

    private String allDay;

    private ExtendedPropsRequest extendedProps;

    public UserScheduleEntity toEntity(UserEntity user, List<TagEntity> tag) {
        return UserScheduleEntity
                .builder()
                .personalId(id)
                .userId(user)
                .tagId(tag)
                .userScheduleTitle(title)
                .scheduleStartDateTime(start)
                .scheduleEndDateTime(end)
                .userScheduleAllDay(allDay)
                .userScheduleFormState(extendedProps.getFormState())
                .userScheduleContent(extendedProps.getContent())
                .userScheduleTodoList(extendedProps.getTodoList().toString())
                .build();
    }

}