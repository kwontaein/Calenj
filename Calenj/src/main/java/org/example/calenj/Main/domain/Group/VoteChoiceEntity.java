package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.Main.helper.StringListConverter;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "VoteChoice")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder 를 사용
@Builder // 빌더
@Getter
@ToString
public class VoteChoiceEntity {

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

    private String voteItem;

    @Builder.Default
    @Convert(converter = StringListConverter.class)
    private List<String> voter = new ArrayList<>();
    
}
