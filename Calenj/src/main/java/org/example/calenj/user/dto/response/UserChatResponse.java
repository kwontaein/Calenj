package org.example.calenj.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserChatResponse {
    private UUID chatListId;
    private UUID userId;
    private UUID friendId;
    private UUID chatId;
    private boolean open;
}
