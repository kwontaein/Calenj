package org.example.calenj.Main.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity(name = "Friends")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
public class FriendEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "friend_id", columnDefinition = "BINARY(16)")
    private String friendId;

    @Column(name = "from_user_id")
    private String fromUserId;
    @Column(name = "to_user_id")
    private String toUserId;
    @Column(name = "friend_each_other")
    private boolean friendEachOther;
    @Column(name = "nick_name")
    private String nickName;
    @Column(name = "create_date")
    private String createDate;

}
