package org.example.calenj.file.dto.request;

import lombok.Data;

@Data
public class ChatFileRequest {
    private String param;
    private String userId;
    private String chatId;
    private String sendDate;
    private String newOrOld;
}
