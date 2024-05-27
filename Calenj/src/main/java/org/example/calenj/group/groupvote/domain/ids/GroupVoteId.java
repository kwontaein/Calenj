package org.example.calenj.group.groupvote.domain.ids;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupVoteId implements Serializable {
    private UUID voteId;
    private UUID group;
}
