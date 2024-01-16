package org.example.calenj.Main.domain;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.Repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername 실행");
        User user = userRepository.findByAccountid(username)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        return createUserDetails(user);
    }

    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴
    private UserDetails createUserDetails(User user) {
        System.out.println("createUserDetails 실행");
        return User.builder()
                .accountid(user.getUsername())
                .user_password(user.getPassword()) //여기서 암호화를 한번 더 하는 바람에 오류가 생김.
                // 사용자 로딩 프로세스 중에는 올바르지 않습니다. 
                // 패스워드는 데이터베이스에 인코딩된 형태로 저장되어야 합니다. 
                // 회원가입 중에는 패스워드를 평문으로 저장하고, Spring Security가 인증 중에 인코딩을 처리합니다
                .user_role(user.getUser_role())
                .build();
    }
}