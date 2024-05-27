package org.example.calenj.group.groupinfo.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupDetailResponse {

    private UUID groupId;
    private String groupTitle;
    private String groupCreated;
    private String groupCreator;
    private List<GroupUserResponse> members; //Group_UserEntity에서 목록으로 가져오기

}
