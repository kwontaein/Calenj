package org.example.calenj.Main.DTO.Group;

import lombok.Data;
import org.example.calenj.Main.domain.UserEntity;

import java.util.List;

@Data
public class VoteChoiceDTO {
    private List<UserEntity> Voter;
    private List<String> voteItem;
    private int countVoter;
}
