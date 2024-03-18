package org.example.calenj.Main.DTO.Group;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@RequiredArgsConstructor
public class GroupDTO {
    private UUID groupId;
    private String groupTitle;
    private String groupCreated;
    private String groupCreater;

    //jpa 의 jpql 은 DTO 를 통해 조회할 경우 생성자를 생성해줘야 함
    public GroupDTO(UUID groupId, String groupTitle) {
        this.groupId = groupId;
        this.groupTitle = groupTitle;
    }

    //jpa 의 jpql 은 DTO 를 통해 조회할 경우 생성자를 생성해줘야 함
    public GroupDTO(UUID groupId, String groupTitle, String groupCreated, String groupCreater) {
        this.groupId = groupId;
        this.groupTitle = groupTitle;
        this.groupCreated = groupCreated;
        this.groupCreater = groupCreater;
    }
}
