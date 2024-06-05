package org.example.calenj.calendar.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class StampRequest {
    private UUID userId;
    private String content;
    private String title;
}
