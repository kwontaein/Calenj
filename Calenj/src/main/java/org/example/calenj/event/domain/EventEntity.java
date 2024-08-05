package org.example.calenj.event.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.event.domain.Ids.EventId;
import org.example.calenj.user.domain.UserEntity;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;
import java.util.stream.Stream;

@Entity(name = "Events")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
@IdClass(EventId.class)
public class EventEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "event_id", columnDefinition = "BINARY(16)")
    private UUID eventId;

    @Id
    @ManyToOne
    @JoinColumn(name = "own_user_id", referencedColumnName = "user_id", columnDefinition = "BINARY(16)")
    // 이벤트 발생자
    private UserEntity ownUserId;

    // 이벤트 요청받은 사람
    @Column(name = "event_user_id")
    private UUID eventUserId;

    // 이벤트 글
    @Column(name = "event_content")
    private String eventContent;

    // 이벤트 목적
    @Column(name = "event_purpose")
    private String eventPurpose;

    // 이벤트 이름
    @Column(name = "event_name")
    private eventType eventName;

    //이벤트 상태
    @Column(name = "event_status")
    private statusType eventStatus;

    //이벤트 생성일
    @Column(name = "create_date")
    private String createDate;

    // 이벤트 요청받은 사람 닉네임
    @Column(name = "event_user_nickname")
    private String eventUserNickName;

    @Getter
    @RequiredArgsConstructor
    public enum statusType { //enum을 활용한 권한종류 설정
        ACCEPT("승인"),
        REJECT("거절"),
        WAITING("대기");

        private final String status;

        @JsonCreator
        public static statusType statusTypeParsing(String inputValue) {
            return Stream.of(statusType.values())
                    .filter(statusType -> statusType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(null);
        }
    }

    @Getter
    @RequiredArgsConstructor
    public enum eventType { //enum을 활용한 권한종류 설정
        RequestFriend("친구 요청"),
        InviteGroup("그룹 초대"),
        JoinSchedule("일정 참여 요청"),
        Else("그 외 이벤트");

        private final String eventName;

        @JsonCreator
        public static eventType eventTypeParsing(String inputValue) {
            return Stream.of(eventType.values())
                    .filter(eventType -> eventType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(null);
        }
    }
}
