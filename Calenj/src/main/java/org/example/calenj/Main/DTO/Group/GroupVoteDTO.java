package org.example.calenj.Main.DTO.Group;

import lombok.Data;

@Data
public class GroupVoteDTO {
    private String vote_title;
    private String[] vote_Item;
    private String vote_start_date;
    private String vote_end_date;
}
