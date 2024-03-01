package org.example.calenj.Main.DTO;

import lombok.Data;

import java.util.UUID;

@Data
public class GroupScheduleDTO {
    private UUID groupId;
    private String groupUser;
    private String userEmail;
    private String group_schedule_title;
    private String group_schedule_content;
}
