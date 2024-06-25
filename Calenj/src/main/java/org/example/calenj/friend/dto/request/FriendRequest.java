package org.example.calenj.friend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequest {
    private String userName;
    private String isAccept;
    private String friendUserId;
    private String eventContent;
    private UUID friendId;
}
