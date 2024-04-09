package org.example.calenj.Main.DTO.Chat;

import lombok.Data;

@Data
public class ChatMessageResponse {
    private String groupMsg;
    private String friendMsg;
    private String nickName;
    private String message;
}
