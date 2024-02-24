package org.example.calenj.Main.DTO;

import lombok.Data;
import org.example.calenj.Main.domain.Group.GroupEntity;

import java.util.UUID;

@Data
public class GroupDTO {
    private UUID groupid;
    private String grouptitle;
    private String groupcreated;

    public GroupEntity groupEntity() {
        return GroupEntity.builder()
                .grouptitle(grouptitle)
                .groupcreated(groupcreated)
                .build();
    }
}
