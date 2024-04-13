package org.example.calenj.Main.DTO.Response.Chat;

import lombok.Data;

@Data
public class ChatMessageResponse {
    private int state;
    private String groupMsg;
    private String friendMsg;
    private String nickName;
    private String message;

    private int endPoint;

}
