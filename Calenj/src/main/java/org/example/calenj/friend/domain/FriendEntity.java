package org.example.calenj.friend.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.friend.domain.ids.FriendId;
import org.example.calenj.user.domain.UserEntity;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;
import java.util.stream.Stream;

@Entity(name = "Friends")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
@IdClass(FriendId.class)
public class FriendEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "friend_id", columnDefinition = "BINARY(16)")
    private UUID friendId;

    @Id
    @ManyToOne
    @JoinColumn(name = "own_user_id", referencedColumnName = "user_id", columnDefinition = "BINARY(16)")
    // 소유자 아이디
    private UserEntity ownUserId;

    // 친구 아이디
    @Column(name = "friend_user_id", columnDefinition = "BINARY(16)")
    private UUID friendUserId;

    // 친구 닉네임
    @Column(name = "nick_name")
    private String nickName;

    //친구된 날짜
    @Column(name = "create_date")
    private String createDate;

    //친구 상태
    @Column(name = "status")
    @Builder.Default
    private statusType status = statusType.WAITING;

    // 채팅방 아이디
    @Column(nullable = false, name = "chatting_room_Id", columnDefinition = "BINARY(16)")
    private UUID ChattingRoomId;

    @Getter
    @RequiredArgsConstructor
    public enum statusType { //enum을 활용한 권한종류 설정
        ACCEPT("친구"), //친구 요청 받음
        BAN("차단"), //내가 차단
        DELETE("삭제"),
        WAITING("대기"); //난 보냈고, 상대는 대기중

        private final String status;

        @JsonCreator
        public static statusType statusTypeParsing(String inputValue) {

            return Stream.of(statusType.values())
                    .filter(statusType -> statusType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(null);
        }

    }

}
