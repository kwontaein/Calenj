package org.example.calenj.Main.domain.Ids;

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
