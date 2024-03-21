package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupVoteDTO {
    private UUID groupId;
    private String voteTitle;
    private String[] voteItem;
    private String voteStartDate;
    private String voteEndDate;
}
