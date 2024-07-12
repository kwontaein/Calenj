package org.example.calenj.websocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

// chatUUID: chatUUID.trim(),
//            sendDate: sendDate.slice(1, 17),
//            userId:userId.trim(),
//            messageType: messageType.trim(),
//            message: messageContent,
@Data
@AllArgsConstructor
public class MessageResponse {
    private String chatUUID;
    private String sendDate;
    private String userId;
    private String messageType;
    private String message;
}
