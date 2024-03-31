package org.example.calenj.Main.model.WebSoket;

import org.example.calenj.Main.DTO.Chat.OnlineDTO;
import org.example.calenj.Main.DTO.Group.GroupUserDTO;
import org.example.calenj.Main.Repository.Group.Group_UserRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

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

    public Map<String, Boolean> offlineList(OnlineDTO onlineDTO, UUID groupId) {
        Map<String, Boolean> onlineList = onlineDTO.getOnlineStatusMap();
        List<GroupUserDTO> groupUserDTO = group_userRepository.findGroupUsers(groupId);

        // 온/오프라인 목록 생성
        for (GroupUserDTO userDTO : groupUserDTO) {
            String nickName = userDTO.getNickName();
            if (!onlineList.containsKey(nickName)) {
                onlineList.put(nickName, false);
            }
        }

        System.out.println("onlineList : " + onlineList);
        return onlineList;
    }

}
