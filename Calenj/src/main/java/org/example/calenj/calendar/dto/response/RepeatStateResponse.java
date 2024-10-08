package org.example.calenj.calendar.dto.response;

import lombok.Data;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class RepeatStateResponse {
    private UUID scheduleId;

    private Timestamp startTime;

    private Timestamp endTime;

    private boolean repeat;

    private String repeatOption;

    private int repeatNum;

    private String repeatMode;

    private String repeatDeadline;

    private Date repeatEnd;

    private int repeatCount;

    private List<Boolean> repeatWeek;

    private List<String> noRepeatDates;

    public RepeatStateResponse(UUID scheduleId, Timestamp startTime, Timestamp endTime, int repeatNum, boolean repeat, String repeatOption, String repeatMode, String repeatDeadline, Date repeatEnd, int repeatCount, List<Boolean> repeatWeek, List<String> noRepeatDates) {
        this.scheduleId = scheduleId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.repeatNum = repeatNum;
        this.repeat = repeat;
        this.repeatOption = repeatOption;
        this.repeatMode = repeatMode;
        this.repeatDeadline = repeatDeadline;
        this.repeatEnd = repeatEnd;
        this.repeatCount = repeatCount;
        this.repeatWeek = repeatWeek;
        this.noRepeatDates = noRepeatDates;
    }

    public static List<String> convertStringToArray(String input) {
        if (input == null) {
            return new ArrayList<>();
        }
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
