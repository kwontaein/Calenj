package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupVoteDTO {
    private String vote_title;
    private String[] vote_Item;
    private String vote_start_date;
    private String vote_end_date;
}
