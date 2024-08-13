package org.example.calenj.user.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity(name = "UserChat")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
public class UserChatEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "chat_friend_id", referencedColumnName = "user_id", columnDefinition = "BINARY(16)")
    private UserEntity friendId;

    @Column(name = "chat_id", columnDefinition = "BINARY(16)")
    private UUID chatId;

    @Column(name = "is_open")
    private boolean isOpen;
}
