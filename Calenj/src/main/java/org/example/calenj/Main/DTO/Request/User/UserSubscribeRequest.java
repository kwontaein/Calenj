package org.example.calenj.Main.DTO.Request.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.DTO.Request.Group.GroupRequest;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSubscribeRequest {
    List<FriendRequest> FriendList;
    List<GroupRequest> GroupList;
    String userId;
}
