package org.example.calenj.Main.DTO.Group;

import org.example.calenj.Main.domain.UserEntity;

import java.util.List;

public class VoteChoiceDTO {
    private List<UserEntity> Voter;
    private String voteItem;
    private int countVoter;
}
