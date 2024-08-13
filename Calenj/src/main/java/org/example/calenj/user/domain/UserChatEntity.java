package org.example.calenj.user.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "UserChat")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
public class UserChatEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "chat_list_id", columnDefinition = "BINARY(16)")
    private UUID chatListId;

    @Column(name = "chat_own_user_id", columnDefinition = "BINARY(16)")
    private UUID ownUserId;

    @Column(name = "chat_friend_id", columnDefinition = "BINARY(16)")
    private UUID friendId;

    @Column(name = "chat_id", columnDefinition = "BINARY(16)")
    private UUID chatId;

    @Column(name = "is_open")
    private boolean isOpen;
}
