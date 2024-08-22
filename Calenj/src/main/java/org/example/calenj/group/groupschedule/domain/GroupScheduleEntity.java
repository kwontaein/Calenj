package org.example.calenj.group.groupschedule.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.calenj.global.helper.StringListConverter;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.user.domain.UserEntity;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "group_schedule")
@Getter
@NoArgsConstructor
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder 를 사용
@Builder // 빌더
public class GroupScheduleEntity {

    //아이디
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "schedule_id", columnDefinition = "BINARY(16)")
    private UUID scheduleId;

    //일정 생성자(관리자
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", columnDefinition = "BINARY(16)")
    private UserEntity manager;

    @Column(name = "schedule_manager")
    @Convert(converter = StringListConverter.class)
    private List<String> managers = new ArrayList<>();

    //일정을 만든 그룹
    @ManyToOne
    @JoinColumn(name = "schedule_group_id", referencedColumnName = "group_id", columnDefinition = "BINARY(16)")
    private GroupEntity schedule_Group;

    //일정 제목
    @Column(name = "schedule_title")
    private String scheduleTitle;

    //일정 생성일
    @Column(name = "schedule_create")
    private Timestamp scheduleCreate;

    //일정 시작 날짜 및 시간
    @Column(name = "schedule_start")
    private Timestamp scheduleStart;

    //일정 공개 범위
    @Column(name = "group_schedule_privacy_relationship")
    private boolean privacy;

    //일정 참여 인원 수
    @Column(name = "group_schedule_max_people")
    private int maxPeople;

    //일정 참여 인원
    @Column(name = "group_schedule_attend_users")
    @Convert(converter = StringListConverter.class)
    private List<String> member = new ArrayList<>();

}
