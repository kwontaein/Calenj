package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.Main.domain.Ids.ChoiceId;
import org.example.calenj.Main.domain.UserEntity;

import java.util.List;

@Entity(name = "Choice")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder 를 사용
@Builder // 빌더
@Getter
//자식테이블을 구분할 구분자 컬럼이름을 지어준다.
@DiscriminatorColumn(name = "DTYPE")
@ToString
@IdClass(ChoiceId.class)
public class ChoiceEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "vote_id", referencedColumnName = "vote_id", columnDefinition = "BINARY(16)")
    // 외래 키에 대한 참조 필드 지정
    private GroupVoteEntity vote;

    @ManyToMany
    @JoinColumn(name = "user_email", referencedColumnName = "user_email", columnDefinition = "varchar(255)")
    // 외래 키에 대한 참조 필드 지정
    private List<UserEntity> user;

    private String content;
    private int count;
}
