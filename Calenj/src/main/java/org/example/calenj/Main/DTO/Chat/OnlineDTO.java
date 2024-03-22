package org.example.calenj.Main.DTO.Chat;

import lombok.Data;

import java.util.Map;
import java.util.UUID;

@Data
public class OnlineDTO {
    private UUID groupId;
    private Map<String, Boolean> onlineStatusMap;
}
