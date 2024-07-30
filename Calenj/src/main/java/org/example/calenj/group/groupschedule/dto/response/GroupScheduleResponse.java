package org.example.calenj.group.groupschedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupScheduleResponse {
    public UUID scheduleId;
    //일정 제목
    public String scheduleTitle;
    //일정 생성일
    public Timestamp scheduleCreate;
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
                                 String managers,
                                 boolean privacy,
                                 int maxPeople,
                                 String member) {
        this.scheduleId = scheduleId;
        this.scheduleTitle = scheduleTitle;
        this.scheduleCreate = scheduleCreate;
        this.managers = convertStringToArray(managers);
        this.privacy = privacy;
        this.maxPeople = maxPeople;
        this.member = convertStringToArray(member);
    }

    public static List<String> convertStringToArray(String input) {

        input = input.trim(); // 공백 제거
        input = input.substring(1, input.length() - 1); // 대괄호 제거
        String[] stringArray = input.split(",\\s*"); // 콤마와 공백을 기준으로 분할
        List<String> StringArray = new ArrayList<>(stringArray.length); // boolean 배열 초기화

        for (String s : stringArray) {
            StringArray.add(s.trim()); // 문자열을 boolean 값으로 변환
        }
        return StringArray; // boolean 배열 반환
    }

}