package org.example.calenj.group.groupnotice.dto.request;

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
