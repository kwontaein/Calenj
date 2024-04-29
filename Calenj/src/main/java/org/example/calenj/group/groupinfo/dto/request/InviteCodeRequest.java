package org.example.calenj.group.groupinfo.dto.request;

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

