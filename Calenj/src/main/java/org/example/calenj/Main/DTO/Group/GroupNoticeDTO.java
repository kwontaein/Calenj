package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupNoticeDTO {

    private String noticeTitle;
    private String noticeCreated;
    private String noticeContent;
    private String noticeCreater;
    private String noticeWatcher;
}
