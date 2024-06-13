package org.example.calenj.calendar.dto.request;

import lombok.Data;

@Data
public class ExtendedPropsRequest {
    private String formState;
    //내용
    private String content;
    //todoList 내용
    private String[] todoList;

    private RepeatStateRequest repeatState;

}
