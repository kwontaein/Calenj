package org.example.calenj.group.groupinfo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupResponse {

    private UUID groupId;
    private String groupTitle;
    private String groupCreated;
    private String groupCreator;

    //jpa의 jpql은 DTO를 통해 조회할 경우 생성자를 생성해줘야 함
    public GroupResponse(UUID groupId, String groupTitle) {
        this.groupId = groupId;
        this.groupTitle = groupTitle;
    }


}
