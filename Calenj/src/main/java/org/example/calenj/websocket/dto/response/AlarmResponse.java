package org.example.calenj.websocket.dto.response;

import lombok.Data;

import java.util.UUID;

@Data
public class AlarmResponse {
    private UUID userId;
    private String alarmContent;
}
