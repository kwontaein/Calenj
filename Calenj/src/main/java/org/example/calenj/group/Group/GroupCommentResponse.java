package org.example.calenj.group.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupCommentResponse {


    private UUID groupId;
    private int comment_id;
    private String commented_by;
    private String comment_user;
    private String comment_content;
    private String comment_date;


}