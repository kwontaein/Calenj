package org.example.calenj.Main.domain.Group;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;
import org.example.calenj.Main.helper.StringListConverter;

import java.util.List;

@Entity(name = "Group_Notice")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@DiscriminatorValue("Group_Notice") // 서브 테이블을 판별하기 위한 값
@Builder(builderMethodName = "GroupNoticeBuilder") // 자식 클래스에서 builder() 메서드 이름을 변경
public class GroupNoticeEntity extends GroupEntity {

    @Column(name = "notice_title")
    private String noticeTitle;

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
