package org.example.calenj.calendar.dto.request;

import lombok.Data;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.user.domain.UserEntity;

import java.sql.Timestamp;
import java.util.UUID;

@Data
public class ScheduleRequest {

    private UUID id;

    private String title;

    private Timestamp start;

    private Timestamp end;

    private String allDay;

    private ExtendedPropsRequest extendedProps;

    public UserScheduleEntity toEntity(UserEntity user) {
        return UserScheduleEntity
                .builder()
                .scheduleId(id)
                .userId(user)
                .userScheduleTitle(title)
                .scheduleStartDateTime(start)
                .scheduleEndDateTime(end)
                .userScheduleAllDay(allDay)
                .tagIds(extendedProps.getTagKeys().toString())
                .userScheduleFormState(extendedProps.getFormState())
                .userScheduleContent(extendedProps.getContent())
                .userScheduleTodoList(extendedProps.getTodoList().toString())
                .build();
    }

}