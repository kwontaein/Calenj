package org.example.calenj.Main.DTO.Request.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupVoteRequest {
    
    private UUID groupId;
    private UUID voteId;
    private String voteEndDate;
    private boolean[] myVote;
    private String voteTitle;
    private String voteCreated;
    private Boolean isMultiple;
    private Boolean anonymous;
    private List<String> postedVoteChoiceDTO; //처음 투표 생성 시 항목을 받아오기 위한 필드

}
