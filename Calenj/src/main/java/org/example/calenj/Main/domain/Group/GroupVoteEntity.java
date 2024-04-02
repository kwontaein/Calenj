package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.Main.domain.Ids.GroupVoteId;
import org.example.calenj.Main.helper.StringListConverter;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Entity(name = "Group_Vote")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder(builderMethodName = "GroupVoteBuilder") // 자식 클래스에서 builder() 메서드 이름을 변경
@IdClass(GroupVoteId.class)
public class GroupVoteEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id", columnDefinition = "BINARY(16)")
    // 외래 키에 대한 참조 필드 지정
    private GroupEntity group;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "vote_id", columnDefinition = "BINARY(16)")
    //주키
    private UUID voteId;

    @Column(name ="vote_creater")
    private String voteCreater;

    @Column(name = "vote_title")
    private String voteTitle;

    @Column(name = "vote_Item")
    @Convert(converter = StringListConverter.class)
    private List<String> voteItem;

    @Column(name = "vote_created")
    private String voteCreated;

    @Column(name = "vote_end_date")
    private String voteEndDate;

    @Column(name = "is_multiple")
    private Boolean isMultiple;

    @Column(name = "anonymous")
    private Boolean anonymous;

    @Column(name ="voter")
    @Convert(converter = StringListConverter.class)
    private List<String> voter;


    @Column(name = "vote_watcher")
    @Convert(converter = StringListConverter.class)
    //List<String> 유형의 형식 필드를 데이터베이스 열로 매핑
    private List<String> voteWatcher;
}
