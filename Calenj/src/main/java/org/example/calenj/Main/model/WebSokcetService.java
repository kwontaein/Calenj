package org.example.calenj.Main.model;

import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class WebSokcetService {
    private final UserRepository userRepository;

    public WebSokcetService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String returnNickname(Authentication authentication) {
        UserEntity userEntity = userRepository.findByUserEmail(authentication.getName()).orElseThrow(() -> new RuntimeException("존재하지 않는 정보"));
        return userEntity.getNickname();
    }
}
