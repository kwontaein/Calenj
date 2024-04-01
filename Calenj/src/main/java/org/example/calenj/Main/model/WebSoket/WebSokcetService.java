package org.example.calenj.Main.model.WebSoket;

import org.example.calenj.Main.DTO.Chat.OnlineDTO;
import org.example.calenj.Main.DTO.Group.GroupUserDTO;
import org.example.calenj.Main.Repository.Group.Group_UserRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class WebSokcetService {
    private final UserRepository userRepository;
    private final Group_UserRepository group_userRepository;

    public WebSokcetService(UserRepository userRepository, Group_UserRepository group_userRepository) {
        this.userRepository = userRepository;
        this.group_userRepository = group_userRepository;
    }

    public String returnNickname(Authentication authentication) {
        UserEntity userEntity = userRepository.findByUserEmail(authentication.getName()).orElseThrow(() -> new RuntimeException("존재하지 않는 정보"));
        return userEntity.getNickname();
    }

    public String returnUserId(String userName) {
        UserEntity userEntity = userRepository.findByUserEmail(userName).orElseThrow(() -> new RuntimeException("존재하지 않는 정보"));
        return userEntity.getUserEmail();
    }


    public Map<String, String> offlineList(OnlineDTO onlineDTO, UUID groupId) {
        Map<String, String> onlineList = new HashMap<>();
        //여기서 온라인 오프라인 여부 불러옴
        List<GroupUserDTO> groupUserDTO = group_userRepository.findGroupUsers(groupId);

        // 온/오프라인 목록 생성
        for (GroupUserDTO userDTO : groupUserDTO) {
            String nickName = userDTO.getNickName();

            String onlineStatus = userDTO.getOnlineStatus().toString().replace("CUSTOM", "");
            userDTO.setOnlineStatus(UserEntity.OnlineStatus.valueOf(onlineStatus));

            if (userDTO.getOnlineStatus() == UserEntity.OnlineStatus.OFFLINE) {
                onlineList.put(nickName, "OFFLINE");
            } else if (userDTO.getOnlineStatus() == UserEntity.OnlineStatus.SLEEP) {
                onlineList.put(nickName, "SLEEP");
            } else if (userDTO.getOnlineStatus() == UserEntity.OnlineStatus.TOUCH) {
                onlineList.put(nickName, "TOUCH");
            } else {
                onlineList.put(nickName, "ONLINE");
            }
        }

        System.out.println("onlineList : " + onlineList);
        return onlineList;
    }

    public boolean OnOff(String userId) {
        UserEntity userEntity = userRepository.findByUserEmail(userId).orElseThrow(() -> new RuntimeException("존재하지 않는 정보"));

        if (userEntity.getIsOnline() == UserEntity.OnlineStatus.OFFLINE) {//온/오프라인 전환
            System.out.println("온라인 : " + UserEntity.OnlineStatus.ONLINE);
            userRepository.updateIsOnline(userId, UserEntity.OnlineStatus.ONLINE.toString());
            return true;
        } else {
            System.out.println("오프라인 : " + UserEntity.OnlineStatus.OFFLINE);
            userRepository.updateIsOnline(userId, UserEntity.OnlineStatus.OFFLINE.toString());
            return false;
        }

    }
}
