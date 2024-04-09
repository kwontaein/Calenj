package org.example.calenj.Main.DTO.User;

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


    public String userId;
    private String isAccept;
    private String friendId;
    private UserEntity ownUserId;
    private String friendUserId;
    private String nickName;
    private String createDate;
    private FriendEntity.statusType status;
    private UUID ChattingRoomId;

    public FriendDTO(String friendUserId, String nickName, UUID ChattingRoomId) {
        this.friendUserId = friendUserId;
        this.nickName = nickName;
        this.ChattingRoomId = ChattingRoomId;
    }

    public FriendDTO(String friendUserId, String nickName, UUID ChattingRoomId, String createDate) {
        this.friendUserId = friendUserId;
        this.nickName = nickName;
        this.ChattingRoomId = ChattingRoomId;
        this.createDate = createDate;
    }


}
