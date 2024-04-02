package org.example.calenj.Main.domain.Ids;

import java.io.Serializable;
import java.util.UUID;

public class ChoiceId implements Serializable {
    private UUID choiceId;
    private UUID vote; // vote_id 대신 voteId로 수정
    /*private String user; // vote_id 대신 voteId로 수정*/
}
