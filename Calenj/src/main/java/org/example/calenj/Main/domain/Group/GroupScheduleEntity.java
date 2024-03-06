package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "Group_Schedule")
@Getter
@DiscriminatorValue("Group_Schedule") // 서브 테이블을 판별하기 위한 값
public class GroupScheduleEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "group_schedule_id", columnDefinition = "BINARY(16)")
    private UUID groupScheduleId;

    @Id
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "group_id", referencedColumnName = "group_id"),
            @JoinColumn(name = "user_email", referencedColumnName = "user_email")
    })
    private GroupUserEntity groupUser;

    @Column(name = "group_schedule_location")
    private String groupScheduleLocation;
    @Column(name = "group_schedule_title")
    private String groupScheduleTitle;
    @Column(name = "group_schedule_content")
    private String groupScheduleContent;
}
