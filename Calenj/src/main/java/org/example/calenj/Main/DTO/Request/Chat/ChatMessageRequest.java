package org.example.calenj.Main.DTO.Request.Chat;

import lombok.Data;

@Data
public class ChatMessageRequest {
    private int state;
    private String groupMsg;
    private String friendMsg;
    private String nickName;
    private String message;

    private int endPoint;
}
