package org.example.calenj.group.groupnotice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupNoticeResponse {


    private UUID groupId;
    private UUID noticeId;
    private String noticeCreated;
    private String noticeTitle;
    private String noticeContent;
    private String noticeCreator;
    private List<String> noticeWatcher;

    public GroupNoticeResponse(UUID noticeId, String noticeTitle, String noticeContent, String noticeCreator, String noticeCreated) {
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
        this.noticeCreator = noticeCreator;
        this.noticeCreated = noticeCreated;
        this.noticeId = noticeId;
    }


    public GroupNoticeResponse(UUID noticeId, String noticeTitle, String noticeContent, String noticeCreator, String noticeCreated, List<String> noticeWatcher) {
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
        this.noticeCreator = noticeCreator;
        this.noticeCreated = noticeCreated;
        this.noticeWatcher = noticeWatcher;
        this.noticeId = noticeId;
    }


    //noticeTitle, gn.noticeContent, gn.noticeWatcher, gn.noticeCreator, gn.noticeCreated


}
