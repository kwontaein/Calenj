package org.example.calenj.Main.DTO;

import lombok.Data;

@Data
public class GroupNoticeDTO {
    private String notice_title;
    private String notice_created;
    private String notice_content;
    private String notice_creater;
    private String notice_watcher;
}
