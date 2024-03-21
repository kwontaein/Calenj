package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupScheduleDTO {
    private String groupScheduleId;
    private String group_schedule_title;
    private String groupScheduleTitle;
    private String groupScheduleContent;
}
