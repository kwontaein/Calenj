package org.example.calenj.calendar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StampResponse {
    private UUID stampId;
    private String content;
    private String title;
}
