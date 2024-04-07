package org.example.calenj.Main.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.domain.FriendEntity;
import org.example.calenj.Main.domain.UserEntity;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendDTO {

    private String friendId;

    // 소유자 아이디
    private UserEntity ownUserId;

    // 친구 아이디
    private String friendUserId;

    // 친구 닉네임
    private String nickName;

    //친구된 날짜
    private String createDate;

    //친구 상태
    private FriendEntity.statusType status;

    //친구 채팅 id
    private UUID ChatingUUID;

    public FriendDTO(String friendUserId, String nickName) {
        this.friendUserId = friendUserId;
        this.nickName = nickName;
    }

}
