package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupNoticeDTO {
    private String notice_title;
    private String notice_created;
    private String notice_content;
    private String notice_creater;
    private String notice_watcher;
}
