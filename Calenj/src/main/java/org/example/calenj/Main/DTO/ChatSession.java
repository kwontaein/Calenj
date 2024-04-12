package org.example.calenj.Main.DTO;

import jakarta.websocket.Session;
import lombok.Data;

@Data
public class ChatSession { // WebSocket 세션
    private Session session;
    // id
    private String id;

}
