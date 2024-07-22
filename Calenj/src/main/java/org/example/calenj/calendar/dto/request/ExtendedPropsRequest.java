package org.example.calenj.calendar.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ExtendedPropsRequest {

    private List<String> tagKeys;

    private String formState;
    //내용
    private String content;
    //todoList 내용
    private List<String> todoList;

    private List<String> friendList;

    private RepeatStateRequest repeatState;

}
