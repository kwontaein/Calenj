package org.example.calenj.group.groupnotice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.group.groupnotice.domain.GroupNoticeEntity;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupNoticeRequest {
    private UUID groupId;
    private String noticeCreated;
    private String noticeTitle;
    private String noticeContent;

    public GroupNoticeEntity toEntity(String userId, GroupEntity groupEntity) {
        return GroupNoticeEntity
                .GroupNoticeBuilder()
                .noticeCreated(noticeCreated)
                .noticeTitle(noticeTitle)
                .noticeContent(noticeContent)
                .noticeCreator(userId)
                .group(groupEntity)
                .build();
    }
}
