package org.example.calenj.friend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddFriendResponse {
    private String message;
    private boolean success;
    private UUID userId;
}
