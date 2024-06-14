package org.example.calenj.calendar.dto.response;

import lombok.Data;

@Data
public class CombinedResponse {
    private ScheduleResponse scheduleResponse;
    private ExtendedPropsResponse extendedPropsResponse;
    private RepeatStateResponse repeatStateResponse;

    public CombinedResponse(ScheduleResponse scheduleResponse, ExtendedPropsResponse extendedPropsResponse, RepeatStateResponse repeatStateResponse) {
        this.scheduleResponse = scheduleResponse;
        this.extendedPropsResponse = extendedPropsResponse;
        this.repeatStateResponse = repeatStateResponse;
    }
}
