package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "Group_Vote")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder(builderMethodName = "GroupVoteBuilder") // 자식 클래스에서 builder() 메서드 이름을 변경
@DiscriminatorValue("Group_Vote") // 서브 테이블을 판별하기 위한 값
public class GroupVoteEntity{

    @Id
    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id", columnDefinition = "BINARY(16)")
    // 외래 키에 대한 참조 필드 지정
    private GroupEntity group;

    @Column(name = "vote_title")
    private String voteTitle;

    @Column(name = "vote_Item")
    private String voteItem;

    @Column(name = "vote_start_date")
    private String voteStartDate;

    @Column(name = "vote_end_date")
    private String voteEndDate;
}
