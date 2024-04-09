package org.example.calenj.Main.DTO.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.DTO.Group.GroupDTO;
import org.example.calenj.Main.DTO.User.FriendDTO;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSubscribeDTO {
    List<FriendDTO.Response> FriendList;
    List<GroupDTO.Response> GroupList;
    String userId;
}
