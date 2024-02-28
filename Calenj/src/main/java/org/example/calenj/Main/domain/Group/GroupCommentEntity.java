package org.example.calenj.Main.domain.Group;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;

@Entity(name = "Group_Comment")
@Getter
@DiscriminatorValue("Group_Comment") // 서브 테이블을 판별하기 위한 값
public class GroupCommentEntity extends GroupEntity {
    
    @Column(name = "commented_by")
    private String commentedBy;

    @Column(name = "comment_user")
    private String commentUser;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name = "comment_date")
    private String commentedDate;
}
