package org.example.calenj.group.groupschedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupschedule.dto.request.GroupSubScheduleRequest;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupScheduleResponse {
    public UUID groupScheduleId;
    //일정 제목
    public String groupScheduleTitle;
    //일정 생성일
    public Timestamp groupScheduleCreate;
    //관리자들
    private String managers;
    //일정 공개 범위
    private String privacy;
    //일정 참여 인원 수
    private int maxPeople;
    //서브 일정 목록
    public List<GroupSubScheduleRequest> groupSubSchedules;
}