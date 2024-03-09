package org.example.calenj.Main.domain.Group;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "Group_Notice")
@Getter
@DiscriminatorValue("Group_Notice") // 서브 테이블을 판별하기 위한 값
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
    private String noticeWatcher;

}
