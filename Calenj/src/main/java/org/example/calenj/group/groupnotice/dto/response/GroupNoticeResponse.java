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
    private String noticeContent;
    private String noticeCreater;
    private List<String> noticeWatcher;

    public GroupNoticeResponse(UUID noticeId, String noticeContent, String noticeCreater, String noticeCreated) {
        this.noticeContent = noticeContent;
        this.noticeCreater = noticeCreater;
        this.noticeCreated = noticeCreated;
        this.noticeId = noticeId;
    }


    public GroupNoticeResponse(UUID noticeId, String noticeContent, String noticeCreater, String noticeCreated, List<String> noticeWatcher) {
        this.noticeContent = noticeContent;
        this.noticeCreater = noticeCreater;
        this.noticeCreated = noticeCreated;
        this.noticeWatcher = noticeWatcher;
        this.noticeId = noticeId;
    }


    //noticeTitle, gn.noticeContent, gn.noticeWatcher, gn.noticeCreater, gn.noticeCreated


}