package org.example.calenj.calendar.dto.request;

import lombok.Data;

@Data
public class ExtendedProps {
    //내용
    private String content;
    //내용
    private String[] todoList;

    private RepeatState repeatState;

}
