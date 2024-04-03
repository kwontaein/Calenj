package org.example.calenj.Main.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InviteCodeDTO {
    //그룹아읻디
    private UUID groupId;
    //초대자
    private String inviter;
    //초대 코드
    private String inviteCode;
    // 사용 기간
    private String endDateTime;
    // 사용 횟수
    private int useCount;
    // 사용 가능 횟수
    private int maxUseAble;

    //--------임의 추가 변수
    //그룹명
    private String groupTitle;
    //온라인 유저 수
    private int onlineCount;
    //그룹 유저 수
    private int memberCount;
    //코드 유효 정보
    private String ableCode;

    //리포지토리 정보 생성자
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
