package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.Main.domain.Ids.GroupNoticeId;
import org.example.calenj.Main.helper.StringListConverter;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Entity(name = "Group_Notice")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder(builderMethodName = "GroupNoticeBuilder") // 자식 클래스에서 builder() 메서드 이름을 변경
@IdClass(GroupNoticeId.class)
public class GroupNoticeEntity {


    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "notice_id", columnDefinition = "BINARY(16)")
    //주키
    private UUID noticeId;

    @Id
    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id", columnDefinition = "BINARY(16)")
    // 외래 키에 대한 참조 필드 지정
    private GroupEntity group;

    @Column(name = "notice_created")
    private String noticeCreated;

    @Column(name = "notice_content")
    private String noticeContent;

    @Column(name = "notice_creater")
    private String noticeCreater;

    @Column(name = "notice_watcher")
    @Convert(converter = StringListConverter.class)
    //List<String> 유형의 형식 필드를 데이터베이스 열로 매핑
    private List<String> noticeWatcher;

}
