package org.example.calenj.Main.DTO.Group;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class GroupDetailDTO {
    private UUID groupId;
    private String groupCreated;
    private String groupTitle;
    private String groupCreater;
    private List<GroupUserDTO> members; //Group_UserEntity에서 목록으로 가져오기

    public GroupDetailDTO(UUID groupId, String groupTitle, String groupCreated, String groupCreater, List<GroupUserDTO> members) {
        this.groupId = groupId;
        this.groupTitle = groupTitle;
        this.groupCreated = groupCreated;
        this.groupCreater = groupCreater;
        this.members = members;
    }

}
