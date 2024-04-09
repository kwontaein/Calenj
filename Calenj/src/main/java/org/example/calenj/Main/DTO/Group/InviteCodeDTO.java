package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InviteCodeDTO {


    private UUID groupId;
    private String inviter;
    private String inviteCode;
    private String endDateTime;
    private int useCount;
    private int maxUseAble;
    // --------임의 추가 변수
    private String groupTitle;
    private int onlineCount;
    private int memberCount;
    private String ableCode;

    public InviteCodeDTO(UUID groupId, String groupTitle, String nickname, String endDateTime, int useAbleCount, int maxUseAble) {
        this.groupId = groupId;
        this.groupTitle = groupTitle;
        this.inviter = nickname;
        this.endDateTime = endDateTime;
        this.useCount = useAbleCount;
        this.maxUseAble = maxUseAble;
    }

    public InviteCodeDTO(String nickname, String inviteCode, String endDateTime, int useCount) {
        this.inviter = nickname;
        this.inviteCode = inviteCode;
        this.endDateTime = endDateTime;
        this.useCount = useCount;
    }
}


