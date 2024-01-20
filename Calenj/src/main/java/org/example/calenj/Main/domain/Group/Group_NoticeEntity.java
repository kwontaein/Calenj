package org.example.calenj.Main.domain.Group;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "Group_Notice")
@Getter
@DiscriminatorValue("Group_Notice") // 서브 테이블을 판별하기 위한 값
public class Group_NoticeEntity extends GroupEntity {
    private String notice_title;
    private String notice_created;
    
}
