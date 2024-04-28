package org.example.calenj.websocket.dto.response;

import lombok.Data;

@Data
public class AlarmResponse {
    private String userId;
    private String alarmContent;
}
