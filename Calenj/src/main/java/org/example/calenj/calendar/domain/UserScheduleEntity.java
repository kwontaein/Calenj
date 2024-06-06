package org.example.calenj.calendar.domain;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.calendar.domain.Ids.UserScheduleEntityId;
import org.example.calenj.calendar.dto.request.ScheduleRequest;
import org.example.calenj.user.domain.UserEntity;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;
import java.util.UUID;

@Entity(name = "User_Schedule")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
@IdClass(UserScheduleEntityId.class)
public class UserScheduleEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "schedule_id", columnDefinition = "BINARY(16)")
    private UUID scheduleId;

    private String personalId;

    @ManyToOne
    @JoinColumn(name = "schedule_user_id", referencedColumnName = "user_id", columnDefinition = "BINARY(16)")
    private UserEntity userId;

    //카테고리
    private String category;

    //제목
    @Column(name = "user_schedule_title")
    private String userScheduleTitle;

    //내용
    @Column(name = "user_schedule_content")
    private String userScheduleContent;

    //시작일
    @Column(name = "schedule_start_datetime")
    private Timestamp scheduleStartDateTime;

    //종료일
    @Column(name = "schedule_end_datetime")
    private Timestamp scheduleEndDateTime;

    //반복여부
    @Column(name = "schedule_repeat")
    private boolean scheduleRepeat;

    //반복 기간
    @Column(name = "schedule_repeat_period")
    private Timestamp scheduleRepeatPeriod;

    //반복 주기
    @Column(name = "schedule_repeat_delay")
    private int scheduleRepeatDelay;


    // UserScheduleEntity 수정 메소드
    public void updateScheduleDetails(ScheduleRequest scheduleRequest) {
        this.scheduleStartDateTime = scheduleRequest.getScheduleStartDateTime();
        this.scheduleEndDateTime = scheduleRequest.getScheduleEndDateTime();
        this.userScheduleTitle = scheduleRequest.getUserScheduleTitle();
        this.userScheduleContent = scheduleRequest.getUserScheduleContent();
        this.scheduleRepeat = scheduleRequest.isScheduleRepeat();
        this.scheduleRepeatPeriod = scheduleRequest.getScheduleRepeatPeriod();
        this.scheduleRepeatDelay = scheduleRequest.getScheduleRepeatDelay();
    }
}
