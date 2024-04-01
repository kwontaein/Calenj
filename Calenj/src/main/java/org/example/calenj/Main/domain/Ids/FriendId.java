package org.example.calenj.Main.domain.Ids;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Embeddable
public class FriendId implements Serializable {
    private UUID friendId;
    private UUID ownUserId;
}
