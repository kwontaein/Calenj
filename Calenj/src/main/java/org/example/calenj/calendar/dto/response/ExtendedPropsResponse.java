package org.example.calenj.calendar.dto.response;

import lombok.Data;

import java.util.UUID;

@Data
public class ExtendedPropsResponse {
    private UUID scheduleId;
    private String formState;
    //내용
    private String content;
    //내용
    private String todoList;

    //태그 정보
    private String[] tagKeys;

    private RepeatStateResponse RepeatState;

    public ExtendedPropsResponse(String tag, UUID scheduleId, String formState, String content, String todoList) {
        this.tagKeys = convertStringToArray(tag);
        this.scheduleId = scheduleId;
        this.content = content;
        this.todoList = todoList;
        this.formState = formState;
    }

    public static String[] convertStringToArray(String input) {
        input = input.trim(); // 공백 제거
        input = input.substring(1, input.length() - 1); // 대괄호 제거
        return input.split(",\\s*");
    }
}