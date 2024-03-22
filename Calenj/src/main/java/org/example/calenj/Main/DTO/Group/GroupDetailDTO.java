package org.example.calenj.Main.DTO.Group;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupDetailDTO {
    private UUID groupId;
    private String groupTitle;
    private String groupCreated;
    private String groupCreater;
    private List<GroupUserDTO> members; //Group_UserEntity에서 목록으로 가져오기
}
