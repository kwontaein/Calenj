package org.example.calenj.Main.Service.WebSoket;

import org.example.calenj.Main.Repository.Group.Group_UserRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

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
    
}
