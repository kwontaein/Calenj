package org.example.calenj.calendar.dto.response;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ExtendedPropsResponse {
    private UUID scheduleId;
    private String formState;
    //내용
    private String content;
    //내용
    private List<String> todoList;

    private List<UUID> friendList;
    //태그 정보
    private List<String> tagKeys;

    private RepeatStateResponse repeatState;

    public ExtendedPropsResponse(List<String> tag, UUID scheduleId, String formState, String content, List<String> todoList, List<UUID> friendList) {
        this.tagKeys = tag;
        this.scheduleId = scheduleId;
        this.content = content;
        this.todoList = todoList;
        this.friendList = friendList;
        this.formState = formState;
    }
}