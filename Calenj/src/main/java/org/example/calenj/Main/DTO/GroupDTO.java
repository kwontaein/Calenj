package org.example.calenj.Main.DTO;

import lombok.Data;
import org.example.calenj.Main.domain.Group.GroupEntity;

@Data
public class GroupDTO {
    private String group_created;
    private String group_title;

    public GroupEntity groupEntity() {
        return GroupEntity.builder()
                .group_title(group_title)
                .group_created(group_created)
                .build();
    }
}