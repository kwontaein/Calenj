package org.example.calenj.Main.DTO.Request.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequest {

    public String userId;
    private String isAccept;
    private String friendUserId;
}
