package org.example.calenj.Main.DTO.Group;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class GroupCommentDTO {
    private int comment_id;
    private String commented_by;
    private String comment_user;
    private String comment_content;
    private String comment_date;


    public GroupCommentDTO(int comment_id, String commented_by, String comment_user, String comment_content, String comment_date) {
        this.comment_id = comment_id;
        this.commented_by = commented_by;
        this.comment_user = comment_user;
        this.comment_content = comment_content;
        this.comment_date = comment_date;
    }

}
