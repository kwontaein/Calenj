package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupCommentDTO {
    private int comment_id;
    private String commented_by;
    private String comment_user;
    private String comment_content;
    private String comment_date;

}
