package org.example.calenj.calendar.domain;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.calendar.domain.Ids.TagId;
import org.example.calenj.user.domain.UserEntity;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "Schedule_Tag")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
@IdClass(TagId.class)
public class TagEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "tag_id", columnDefinition = "BINARY(16)")
    private UUID tagId;

    @ManyToOne
    @JoinColumn(name = "tag_user_id", referencedColumnName = "user_id", columnDefinition = "BINARY(16)")
    private UserEntity userId;

    @Column(name = "tag")
    private String tag;

    @Column(name = "tag_color")
    private String tagColor;
}