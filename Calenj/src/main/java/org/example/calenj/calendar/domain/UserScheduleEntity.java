package org.example.calenj.calendar.domain;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.calendar.domain.Ids.UserScheduleEntityId;
import org.example.calenj.user.domain.UserEntity;

import java.sql.Timestamp;

@Entity(name = "User_Schedule")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
@IdClass(UserScheduleEntityId.class)
public class UserScheduleEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "schedule_user_id", referencedColumnName = "user_id", columnDefinition = "BINARY(16)")
    private UserEntity userId;

    //제목
    @Column(name = "user_schedule_title")
    private String userScheduleTitle;

    //내용
    @Column(name = "user_schedule_content")
    private String userScheduleContent;

    //시작일
    @Column(name = "schedule_start_datetime")
    private Timestamp ScheduleStartDateTime;

    //종료일
    @Column(name = "schedule_end_datetime")
    private Timestamp ScheduleEndDateTime;

    //반복여부
    @Column(name = "schedule_repeat")
    private boolean ScheduleRepeat;

    //반복 기간
    @Column(name = "schedule_repeat_period")
    private boolean ScheduleRepeatPeriod;

    //중요 여부
    @Column(name = "schedule_important")
    private boolean ScheduleImportant;
}
