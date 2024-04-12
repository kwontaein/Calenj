package org.example.calenj.Main.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.Main.domain.Ids.MessageEventId;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;
import java.util.stream.Stream;

@Entity(name = "MessageEvent")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
@IdClass(MessageEventId.class)
public class MessageEventEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "msg_event_id", columnDefinition = "BINARY(16)")
    private UUID messageEventId;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_email", columnDefinition = "varchar(255)")
    // 이벤트 발생자
    private UserEntity userId;

    @Column(name="params_id")
    private UUID paramsId;

    @Column(name="params_type")
    private ParmasType paramsType;

    @Column(name="end_point")
    private int endPoiont;

    @Getter
    @RequiredArgsConstructor
    public enum ParmasType { //enum을 활용한 권한종류 설정
        FRIEND("친구"), //친구
        GROUP("그룹"); //그룹


        private final String paramsType;

        @JsonCreator
        public static ParmasType parmasTypeParsing(String inputValue) {

            return Stream.of(MessageEventEntity.ParmasType.values())
                    .filter(ParmasType -> ParmasType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(null);
        }
    }
}






