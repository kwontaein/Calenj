package org.example.calenj.calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class TagResponse {
    private UUID id;
    private String name;
    private String color;
    private boolean defaultTag;
}
