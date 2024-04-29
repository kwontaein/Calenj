package org.example.calenj.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.friend.dto.response.FriendResponse;
import org.example.calenj.group.groupinfo.dto.response.GroupResponse;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSubscribeResponse {
    List<FriendResponse> FriendList;
    List<GroupResponse> GroupList;
    String userId;
}
