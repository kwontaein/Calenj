package org.example.calenj.friend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequest {
    private String userName;
    private int isAccept;
    private String friendUserName;
}
