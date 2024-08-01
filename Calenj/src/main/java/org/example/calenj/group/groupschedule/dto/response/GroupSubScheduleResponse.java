package org.example.calenj.group.groupschedule.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class GroupSubScheduleResponse {
    private UUID subScheduleId;

    private String scheduleTitle;

    private Timestamp subScheduleCreate;

    private int subScheduleDuration;

    private String subScheduleContent;

    private int index;

    private List<String> joinUser;

    public GroupSubScheduleResponse(UUID subScheduleId, String scheduleTitle, Timestamp subScheduleCreate, int subScheduleDuration, String subScheduleContent, int index, String joinUser) {
        this.subScheduleId = subScheduleId;
        this.scheduleTitle = scheduleTitle;
        this.subScheduleCreate = subScheduleCreate;
        this.subScheduleDuration = subScheduleDuration;
        this.subScheduleContent = subScheduleContent;
        this.index = index;
        this.joinUser = convertStringToArray(joinUser);
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
