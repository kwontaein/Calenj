package org.example.calenj.Main.DTO.Request.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupNoticeRequest {
    private UUID groupId;
    private String noticeCreated;
    private String noticeContent;
}
