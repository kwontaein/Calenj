package org.example.calenj.friend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequest {

    private String userId;
    private int isAccept;
    private String friendUserId;
}
