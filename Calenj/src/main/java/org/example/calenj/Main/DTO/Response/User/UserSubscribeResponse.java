package org.example.calenj.Main.DTO.Response.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.DTO.Response.Group.GroupResponse;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSubscribeResponse {
    List<FriendResponse> FriendList;
    List<GroupResponse> GroupList;
    String userId;
}
