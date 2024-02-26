package org.example.calenj.Main.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.GenericGenerator;

@Entity(name = "Friends")
@Getter
@DiscriminatorValue("Friends")
public class FriendEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "friend_id", columnDefinition = "BINARY(16)")
    private String friendId;

    private String fromUserId;
    private String toUserId;
    private boolean friendEachOther;
    private String nickName;
    private String createDate;

}
