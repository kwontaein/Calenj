package org.example.calenj.group.groupschedule.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;
import java.util.UUID;

@Entity(name = "group_sub_schedule")
@NoArgsConstructor
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder 를 사용
@Builder // 빌더
@Getter
public class GroupSubScheduleEntity {

    //상위 그룹 일정
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "group_sub_schedule_id", columnDefinition = "BINARY(16)")
    private UUID groupSubScheduleId;

    @ManyToOne
    @JoinColumn(name = "group_schedule_id", referencedColumnName = "group_schedule_id", columnDefinition = "BINARY(16)")
    private GroupScheduleEntity groupScheduleId;

    //서브 일정 제목
    @Column(name = "group_schedule_title")
    private String scheduleTitle;

    //서브 일정 생성일
    @Column(name = "group_schedule_create")
    private Timestamp scheduleCreate;

    //서브 일정 종료시간
    @Column(name = "group_schedule_duration")
    private int scheduleDuration;

    //서브 일정 내용
    @Column(name = "group_schedule_content")
    private String scheduleContent;

    //서브 일정 인덱스
    @Column(name = "group_schedule_index")
    private int index;

    //서브 일정 참여 인원
    @Column(name = "group_schedule_join_user")
    private String joinUser;

    //지도 좌표
    @Column(name = "schedule_locate")
    private String scheduleLocate;

}
