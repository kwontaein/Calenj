package org.example.calenj.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.user.domain.UserChatEntity;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserChatRequest {
    private UUID chatListId;
    private UUID userId;
    private UUID friendId;
    private UUID chatId;
    private boolean open;

    public UserChatEntity toEntity() {
        return
                UserChatEntity
                        .builder()
                        .chatListId(chatListId)
                        .ownUserId(userId)
                        .friendId(friendId)
                        .chatId(chatId)
                        .isOpen(open)
                        .build();
    }
}
