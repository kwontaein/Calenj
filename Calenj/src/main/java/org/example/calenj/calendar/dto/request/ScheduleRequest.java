package org.example.calenj.calendar.dto.request;

import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
public class ScheduleRequest {

    private UUID scheduleId;

    private String id;

    private UUID tagId;

    private String title;

    private Timestamp start;

    private Timestamp end;

    private String allDay;

    private ExtendedPropsRequest extendedProps;

}