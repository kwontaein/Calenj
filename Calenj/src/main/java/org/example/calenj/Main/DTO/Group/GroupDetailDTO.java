package org.example.calenj.Main.DTO.Group;


import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class GroupDetailDTO {
    private UUID groupId;
    private String groupCreated;
    private String groupTitle;
    private String groupCreater;
    private List<GroupUserDTO> members; //Group_UserEntity에서 목록으로 가져오기

}
