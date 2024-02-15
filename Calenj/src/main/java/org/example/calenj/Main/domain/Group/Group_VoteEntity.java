package org.example.calenj.Main.domain.Group;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "Group_Vote")
@Getter
@DiscriminatorValue("Group_Vote") // 서브 테이블을 판별하기 위한 값
public class Group_VoteEntity extends GroupEntity {
    private String vote_title;
    private String vote_Item;
    private String vote_start_date;
    private String vote_end_date;
}
