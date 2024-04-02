package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupVoteDTO {
    private UUID groupId;
    private UUID voteId;
    private String voteCreater;
    private String voteTitle;
    private String voteCreated;
    private String voteEndDate;
    private Boolean isMultiple;
    private Boolean anonymous;
    private List<String> voteWatcher;
    private List<VoteChoiceDTO> voteChoiceDTO;

    //list만 불러오기위한 생성자
    public GroupVoteDTO(UUID voteId, String voteCreater, String voteTitle, String voteCreated,String voteEndDate){
        this.voteId = voteId;
        this.voteCreater = voteCreater;
        this.voteTitle = voteTitle;
        this.voteCreated = voteCreated;
        this.voteEndDate = voteEndDate;
    }
}
