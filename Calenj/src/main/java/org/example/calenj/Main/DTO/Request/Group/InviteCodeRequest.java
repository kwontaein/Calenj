package org.example.calenj.Main.DTO.Request.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InviteCodeRequest {

    private UUID groupId;
    private String inviteCode;
    private int during;
}

