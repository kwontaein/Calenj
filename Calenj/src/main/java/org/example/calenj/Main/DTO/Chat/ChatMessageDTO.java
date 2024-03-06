package org.example.calenj.Main.DTO.Chat;

import lombok.Data;

@Data
public class ChatMessageDTO {
    private String roomId;
    private String writer;
    private String message;
}
