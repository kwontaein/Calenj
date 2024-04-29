package org.example.calenj.websocket.dto.request;

import lombok.Data;

@Data
public class AlarmRequest {
    private String personalTopic;
    private String onlineState;
    private String alarmContent;
}
