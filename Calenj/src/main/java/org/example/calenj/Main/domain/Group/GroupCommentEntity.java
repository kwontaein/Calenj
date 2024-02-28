package org.example.calenj.Main.domain.Group;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "Group_Comment")
@Getter
@DiscriminatorValue("Group_Comment") // 서브 테이블을 판별하기 위한 값
public class GroupCommentEntity extends GroupEntity {
    private int comment_id;
    private String commented_by;
    private String comment_user;
    private String comment_content;
    private String comment_date;
}
