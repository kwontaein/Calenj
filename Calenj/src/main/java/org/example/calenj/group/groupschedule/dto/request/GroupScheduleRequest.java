package org.example.calenj.group.groupschedule.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.group.groupschedule.domain.GroupScheduleEntity;
import org.example.calenj.user.domain.UserEntity;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupScheduleRequest {
    public UUID scheduleId;
    //일정을 만든 그룹
    public UUID groupId;
    //일정 제목
    public String scheduleTitle;
    //일정 생성일
    public Timestamp scheduleCreate;
    //일정 생성일
    public Timestamp startDate;
    //일정을 만든 사람
    public UserEntity manager;
    //관리자들
    private List<String> managers;
    //일정 공개 범위
    private boolean privacy;
    //일정 참여 인원 수
    private int maxPeople;
    //참여 유저
    private List<String> member;
    //서브 일정 목록
    public List<GroupSubScheduleRequest> groupSubSchedules;

    public GroupScheduleEntity toEntity(GroupEntity group, Timestamp time) {
        return GroupScheduleEntity
                .builder()
                .schedule_Group(group)
                .scheduleTitle(scheduleTitle)
                .scheduleCreate(time)
                .scheduleStart(startDate)
                .managers(managers)
                .manager(manager)
                .privacy(privacy)
                .maxPeople(maxPeople)
                .member(member)
                .build();
    }
}



