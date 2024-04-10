package org.example.calenj.Main.DTO.Request.Chat;

import lombok.Data;

@Data
public class ChatMessageRequest {
    private String groupMsg;
    private String friendMsg;
    private String nickName;
    private String message;
}
