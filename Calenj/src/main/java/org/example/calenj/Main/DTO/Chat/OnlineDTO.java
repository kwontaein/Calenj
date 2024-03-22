package org.example.calenj.Main.DTO.Chat;

import lombok.Data;

import java.util.Map;

@Data
public class OnlineDTO {
    private String groupId;
    private Map<String, Boolean> onlineStatusMap;
}
