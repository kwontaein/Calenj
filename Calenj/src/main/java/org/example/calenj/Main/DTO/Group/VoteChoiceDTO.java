package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.domain.UserEntity;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteChoiceDTO {
    private String voteItem;
    private List<String> voter;
}
