package org.example.calenj.Main.DTO.Response.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteChoiceResponse {


    private UUID choiceId;
    private String voteItem;
    private List<String> voter;
    private int voteIndex;

    public List<String> getBlindedVoter(List<String> countVoter, String id) {
        List<String> blindedValues = new ArrayList<>();
        for (String value : countVoter) {
            if (!value.equals(id)) {
                blindedValues.add("-");
            } else {
                blindedValues.add(value);
            }
        }
        return blindedValues;
    }


}
