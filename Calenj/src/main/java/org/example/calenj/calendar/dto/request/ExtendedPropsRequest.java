package org.example.calenj.calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExtendedPropsRequest {

    private List<UUID> tagKeys;

    private String formState;
    //내용
    private String content;
    //todoList 내용
    private List<String> todoList;

    private List<UUID> friendList;

    private RepeatStateRequest repeatState;

}
