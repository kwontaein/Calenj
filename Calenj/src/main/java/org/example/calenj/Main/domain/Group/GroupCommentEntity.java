package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.Getter;

@Entity(name = "Group_Comment")
@Getter
public class GroupCommentEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id", columnDefinition = "BINARY(16)")
    @MapsId
    // 외래 키에 대한 참조 필드 지정
    private GroupEntity group;

    @Column(name = "comment_user")
    private String commentUser;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name = "comment_date")
    private String commentedDate;
}
