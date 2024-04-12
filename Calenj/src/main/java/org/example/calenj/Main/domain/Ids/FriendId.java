package org.example.calenj.Main.domain.Ids;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
//@Embeddable
public class FriendId implements Serializable {
    private UUID friendId;
    private String ownUserId;
}
