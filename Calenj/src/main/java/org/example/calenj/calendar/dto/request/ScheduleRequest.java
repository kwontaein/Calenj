package org.example.calenj.calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.user.domain.UserEntity;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleRequest {

    private UUID id;

    private String title;

    private Timestamp start;

    private Timestamp oldStart;

    private Timestamp end;

    private boolean allDay;

    private boolean isGroupSchedule;

    private UUID groupId;

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
                .isGroupSchedule(isGroupSchedule)
                .groupId(groupId)
                .tagIds(extendedProps.getTagKeys())
                .userScheduleFormState(extendedProps.getFormState())
                .userScheduleContent(extendedProps.getContent())
                .userScheduleTodoList(extendedProps.getTodoList())
                .userScheduleFriendList(extendedProps.getFriendList())
                .build();
    }

}