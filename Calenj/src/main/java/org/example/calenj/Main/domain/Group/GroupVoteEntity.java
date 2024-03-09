package org.example.calenj.Main.domain.Group;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "Group_Vote")
@Getter
@DiscriminatorValue("Group_Vote") // 서브 테이블을 판별하기 위한 값
public class GroupVoteEntity extends GroupEntity {

    @Column(name = "vote_title")
    private String voteTitle;

    @Column(name = "vote_Item")
    private String voteItem;

    @Column(name = "vote_start_date")
    private String voteStartDate;

    @Column(name = "vote_end_date")
    private String voteEndDate;
}
