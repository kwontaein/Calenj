package org.example.calenj.group.groupschedule.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class GroupScheduleResponse {
    public UUID scheduleId;
    //일정 제목
    public String scheduleTitle;
    //일정 생성일
    public Timestamp scheduleCreate;
    //일정 생성일
    public Timestamp startDate;
    //관리자들
    private List<String> managers;
    //일정 공개 범위
    private boolean privacy;
    //일정 참여 인원 수
    private int maxPeople;
    //참여 유저
    private List<String> member;

    public GroupScheduleResponse(UUID scheduleId,
                                 String scheduleTitle,
                                 Timestamp scheduleCreate,
                                 Timestamp startDate,
                                 List<String> managers,
                                 boolean privacy,
                                 int maxPeople,
                                 List<String> member) {
        this.scheduleId = scheduleId;
        this.scheduleTitle = scheduleTitle;
        this.scheduleCreate = scheduleCreate;
        this.startDate = startDate;
        this.managers = managers;
        this.privacy = privacy;
        this.maxPeople = maxPeople;
        this.member = member;
    }

}