package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.Getter;

@Entity(name = "Group_Schedule")
@Getter
@DiscriminatorValue("Group_Schedule") // 서브 테이블을 판별하기 위한 값
public class Group_ScheduleEntity {
    @Id
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "group_id", referencedColumnName = "group_id"),
            @JoinColumn(name = "user_email", referencedColumnName = "user_email")
    })

    private Group_UserEntity groupUser;

    private String group_schedule_location;
    private String group_schedule_title;
    private String group_schedule_content;
}
