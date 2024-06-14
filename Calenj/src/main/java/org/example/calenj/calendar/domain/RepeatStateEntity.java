package org.example.calenj.calendar.domain;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.calendar.domain.Ids.RepeatStateId;

import java.sql.Date;
import java.sql.Timestamp;

@Entity(name = "Schedule_Repeat_State")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
@IdClass(RepeatStateId.class)
public class RepeatStateEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_schedule_id", referencedColumnName = "schedule_id", columnDefinition = "BINARY(16)")
    private UserScheduleEntity scheduleId;

    @Column(name = "start_time")
    private Timestamp startTime;

    @Column(name = "end_time")
    private Timestamp endTime;

    @Column(name = "is_repeat")
    private boolean repeat;

    @Column(name = "repeat_option")
    private String repeatOption;

    @Column(name = "repeat_mode")
    private String repeatMode;

    @Column(name = "repeat_deadline")
    private String repeatDeadline;

    @Column(name = "repeat_end")
    private Date repeatEnd;

    @Column(name = "repeat_count")
    private int repeatCount;

    @Column(name = "repeat_week")
    private String repeatWeek;
}
