package org.example.calenj.group.groupvote.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteChoiceRequest {

    private UUID choiceId;
    private String voteItem;
    private List<String> voter;
    private int voteIndex;


}
