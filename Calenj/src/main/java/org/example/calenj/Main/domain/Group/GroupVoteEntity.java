package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "Group_Vote")
@Getter
public class GroupVoteEntity {

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
