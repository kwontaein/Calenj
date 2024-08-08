package org.example.calenj.calendar.domain;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.calendar.domain.Ids.UserScheduleEntityId;
import org.example.calenj.user.domain.UserEntity;

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
    @Column(nullable = false, unique = true, name = "schedule_id", columnDefinition = "BINARY(16)")
    private UUID scheduleId;

    @ManyToOne
    @JoinColumn(name = "schedule_user_id", referencedColumnName = "user_id", columnDefinition = "BINARY(16)")
    private UserEntity userId;

    @Column(name = "tag_ids")
    private String tagIds;

    //제목
    @Column(name = "user_schedule_title")
    private String userScheduleTitle;

    //시작일
    @Column(name = "schedule_start_datetime")
    private Timestamp scheduleStartDateTime;

    //종료일
    @Column(name = "schedule_end_datetime")
    private Timestamp scheduleEndDateTime;

    //종일이벤트
    @Column(name = "user_schedule_all_day")
    private boolean userScheduleAllDay;

    //종일이벤트
    @Column(name = "user_schedule_form_state")
    private String userScheduleFormState;

    //내용
    @Column(name = "user_schedule_content")
    private String userScheduleContent;

    //todoList
    @Column(name = "user_schedule_todo_list")
    private String userScheduleTodoList;

    //friendList
    @Column(name = "user_schedule_friend_list")
    private String userScheduleFriendList;
}
