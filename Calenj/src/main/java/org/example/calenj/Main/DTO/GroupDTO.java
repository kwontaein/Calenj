package org.example.calenj.Main.DTO;

import lombok.Data;
import org.example.calenj.Main.domain.Group.GroupEntity;

@Data
public class GroupDTO {
    private String grouptitle;
    private String groupcreated;

    public GroupDTO(String grouptitle, String groupcreated) {
        this.grouptitle = grouptitle;
        this.groupcreated = groupcreated;
    }

    public GroupEntity groupEntity() {
        return GroupEntity.builder()
                .grouptitle(grouptitle)
                .groupcreated(groupcreated)
                .build();
    }
}
