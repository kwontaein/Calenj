package org.example.calenj.friend.domain.ids;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.user.domain.UserEntity;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@Embeddable
public class FriendId implements Serializable {
    private UUID friendId;
    private UserEntity ownUserId;
}
