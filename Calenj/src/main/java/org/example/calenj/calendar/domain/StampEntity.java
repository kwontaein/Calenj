package org.example.calenj.calendar.domain;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.calendar.domain.Ids.StampID;
import org.example.calenj.user.domain.UserEntity;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "stamp")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
@IdClass(StampID.class)
public class StampEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "stamp_id", columnDefinition = "BINARY(16)")
    private UUID stampId;

    @ManyToOne
    @JoinColumn(name = "stamp_user_id", referencedColumnName = "user_id", columnDefinition = "BINARY(16)")
    private UserEntity userId;

    private String content;
    private String title;
}
