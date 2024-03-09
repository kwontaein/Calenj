package org.example.calenj.Main.DTO.Group;

import lombok.Data;

@Data
public class GroupCommentDTO {
    private int comment_id;
    private String commented_by;
    private String comment_user;
    private String comment_content;
    private String comment_date;

}
