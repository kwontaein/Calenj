package org.example.calenj.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.friend.dto.request.FriendRequest;
import org.example.calenj.group.groupinfo.dto.request.GroupRequest;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSubscribeRequest {
    List<FriendRequest> FriendList;
    List<GroupRequest> GroupList;
    String userId;
}
