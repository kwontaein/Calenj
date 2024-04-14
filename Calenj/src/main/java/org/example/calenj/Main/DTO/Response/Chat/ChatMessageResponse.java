package org.example.calenj.Main.DTO.Response.Chat;

import lombok.Data;

import java.util.List;

@Data
public class ChatMessageResponse {
    private int state;
    private String groupMsg;
    private String friendMsg;
    private String nickName;
    private List<String> message;
    private int endPoint;
}
