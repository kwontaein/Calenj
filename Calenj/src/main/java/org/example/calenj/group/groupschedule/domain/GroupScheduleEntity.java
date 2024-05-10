package org.example.calenj.group.groupschedule.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.example.calenj.group.groupinfo.domain.GroupUserEntity;
import org.example.calenj.group.groupschedule.domain.ids.GroupScheduleId;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "Group_Schedule")
@Getter
@IdClass(GroupScheduleId.class)
public class GroupScheduleEntity {

    //아이디
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "group_schedule_id", columnDefinition = "BINARY(16)")
    private UUID groupScheduleId;

    //참여자
    @Id
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "group_id", referencedColumnName = "group_id"),
            @JoinColumn(name = "user_email", referencedColumnName = "user_email")
    })
    private GroupUserEntity groupUser;
    //위치
    @Column(name = "group_schedule_location")
    private String groupScheduleLocation;
    //제목
    @Column(name = "group_schedule_title")
    private String groupScheduleTitle;
    //내용
    @Column(name = "group_schedule_content")
    private String groupScheduleContent;
    //기간
    @Column(name = "group_schedule_period")
    private String groupSchedulePeriod;
}
