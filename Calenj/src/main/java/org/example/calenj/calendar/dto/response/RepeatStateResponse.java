package org.example.calenj.calendar.dto.response;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Data
public class RepeatStateResponse {
    private UUID scheduleId;

    private Timestamp startTime;

    private Timestamp endTime;

    private boolean repeat;

    private String repeatOption;

    private String repeatMode;

    private String repeatDeadline;

    private Date repeatEnd;

    private int repeatCount;

    private boolean[] repeatWeek;

    public RepeatStateResponse(UUID scheduleId, Timestamp startTime, Timestamp endTime, boolean repeat, String repeatOption, String repeatMode, String repeatDeadline, Date repeatEnd, int repeatCount, String repeatWeek) {
        this.scheduleId = scheduleId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.repeat = repeat;
        this.repeatOption = repeatOption;
        this.repeatMode = repeatMode;
        this.repeatDeadline = repeatDeadline;
        this.repeatEnd = repeatEnd;
        this.repeatCount = repeatCount;
        this.repeatWeek = convertStringToArray(repeatWeek);
    }

    public static boolean[] convertStringToArray(String input) {
        input = input.trim(); // 공백 제거
        input = input.substring(1, input.length() - 1); // 대괄호 제거
        String[] stringArray = input.split(",\\s*"); // 콤마와 공백을 기준으로 분할
        boolean[] booleanArray = new boolean[stringArray.length]; // boolean 배열 초기화

        for (int i = 0; i < stringArray.length; i++) {
            booleanArray[i] = Boolean.parseBoolean(stringArray[i].trim()); // 문자열을 boolean 값으로 변환
        }

        return booleanArray; // boolean 배열 반환
    }
}
