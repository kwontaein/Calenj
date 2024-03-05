package org.example.calenj.Main.DTO;

import lombok.Data;

@Data
public class ChatMessageDTO {
    private String roomId;
    private String writer;
    private String message;
}
