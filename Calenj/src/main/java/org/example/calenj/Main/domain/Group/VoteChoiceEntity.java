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
@ToString
public class ChoiceEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "choice_id", columnDefinition = "BINARY(16)")
    //주키
    private UUID choiceId;

    @ManyToOne
    @JoinColumns(
            {@JoinColumn(name = "vote_id", referencedColumnName = "vote_id", columnDefinition = "BINARY(16)"),
                    @JoinColumn(name = "group_id", referencedColumnName = "group_id", columnDefinition = "BINARY(16)")})
    private GroupVoteEntity vote;

    @ManyToMany
    @JoinTable(
            name = "user", // 연결 테이블 이름 설정
            joinColumns = @JoinColumn(name = "choice_id"), // 현재 엔티티의 외래 키 컬럼 설정
            inverseJoinColumns = @JoinColumn(name = "user_id") // 참조하는 엔티티의 외래 키 컬럼 설정
    )
    private List<UserEntity> user;

    private String content;
    private int count;
}
