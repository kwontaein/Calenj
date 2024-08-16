package org.example.calenj.calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShareScheduleRequest {
    private List<String> chatId;
    private String target;
    private boolean copyAble;
    private ScheduleRequest scheduleRequest;
}
