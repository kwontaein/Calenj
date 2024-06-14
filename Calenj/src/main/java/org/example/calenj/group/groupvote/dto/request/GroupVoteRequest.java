package org.example.calenj.group.groupvote.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.group.groupvote.domain.GroupVoteEntity;

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

    public GroupVoteEntity toEntity(String username, GroupEntity group) {
        return GroupVoteEntity.GroupVoteBuilder()
                .voteCreator(username)
                .voteTitle(voteTitle)
                .voteCreated(voteCreated)
                .voteEndDate(voteEndDate)
                .isMultiple(isMultiple)
                .anonymous(anonymous)
                .group(group).build();
    }
}
