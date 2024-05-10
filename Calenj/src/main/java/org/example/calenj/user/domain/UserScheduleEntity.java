package org.example.calenj.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "User_Schedule")
@Getter
public class UserScheduleEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "group_schedule_id", columnDefinition = "BINARY(16)")
    private UUID userScheduleId;

    //제목
    @Column(name = "group_schedule_title")
    private String userScheduleTitle;
    //내용
    @Column(name = "group_schedule_content")
    private String userScheduleContent;
    //기간
    @Column(name = "group_schedule_period")
    private String userSchedulePeriod;

}
