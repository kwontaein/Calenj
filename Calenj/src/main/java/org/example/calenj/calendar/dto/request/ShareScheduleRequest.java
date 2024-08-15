package org.example.calenj.calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShareScheduleRequest {
    private String chatId;
    private boolean copyAble;
    private ScheduleRequest scheduleRequest;
}
