package org.example.calenj.Main.model;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.FriendDTO;
import org.example.calenj.Main.DTO.Group.GroupDTO;
import org.example.calenj.Main.DTO.UserDTO;
import org.example.calenj.Main.DTO.UserSubscribeDTO;
import org.example.calenj.Main.JWT.JwtToken;
import org.example.calenj.Main.JWT.JwtTokenProvider;
import org.example.calenj.Main.Repository.FriendRepository;
import org.example.calenj.Main.Repository.Group.GroupRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    /*private final ValidateDTO validateDTO;*/

    private final GlobalService globalService;
    private final GroupRepository groupRepository;
    private final FriendRepository friendRepository;


    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final JwtTokenProvider jwtTokenProvider;

    public String saveUser(UserDTO userDTO) {
        //패스워드 암호화
        userDTO.setUserPassword(passwordEncoder.encode(userDTO.getUserPassword()));
        userRepository.save(userDTO.toEntity());
        return userDTO.toEntity().getUserEmail();
    }

    public void selectUserInfo() {
        UserDetails userDetails = globalService.extractFromSecurityContext();

        //select 테스트
        Optional<UserEntity> user = userRepository.findByUserEmail(userDetails.getUsername());
        String userResult = (user.isPresent() ? user.toString() : "정보가 없습니다");
        System.out.println(userResult);
    }

    @Transactional
    public ResponseEntity<String> login(String accountid, String password) {
        //여기서 패스워드를 암호화 하는것도 옳지 않음.
        //로그인 프로세스 중에 패스워드를 다시 인코딩하면 안됨.
        //이미 Authentication 프로세스 내부에서 패스워드 비교를 실행하기 때문.

        JwtToken tokenInfo;
        UserEntity userEntity;

        try {
            // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
            // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(accountid, password);

            try {
                // 사용자 정보 반환
                userEntity = userRepository.findByUserEmail(accountid).orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
            } catch (UsernameNotFoundException e) {
                // 존재하지 않는 사용자인 경우
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("NON_EXISTENT_ERROR");
            }
            // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
            // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            // Spring Security는 실제로 패스워드 값을 Authentication 객체에 저장하지 않습니다.
            // 따라서 authentication.getCredentials() 메서드를 호출하면 항상 null이 반환됩니다.
            // 패스워드를 검증하기 위한 작업은 UserDetailsService의 loadUserByUsername 메서드에서 이루어집니다.

            //검증이 되었다면 -> refreshToken 저장 유무를 불러와서, 있다면 토큰 재발급, 없다면 아예 발급, 만료 기간 여부에 따라서도 기능을 구분

            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            tokenInfo = jwtTokenProvider.generateToken(authentication);

            // 4. refreshToken 정보 저장
            userRepository.updateUserRefreshToken(tokenInfo.getRefreshToken(), userEntity.getUserEmail());
            System.out.println("1");
            return ResponseEntity.status(HttpStatus.OK).body("로그인 성공");
        } catch (BadCredentialsException e) {
            // 비밀번호가 틀린 경우
            System.out.println("2");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("PW_ERROR");
        }

    }

    //request로 받은 쿠키를 체크하는 메소드
    public boolean checkUserToken(Cookie[] requestCookie) {
        boolean checkCookie = false;

        if (requestCookie != null) {
            for (Cookie cookie : requestCookie) {
                if ("refreshToken".equals(cookie.getName())) {
                    UserEntity userEntity = userRepository.findByRefreshToken(cookie.getValue())
                            .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
                    if (userEntity != null) {
                        checkCookie = true;
                    }
                }
            }

        }
        return checkCookie;
    }

    @Transactional
    public void logout(UserDetails userDetails, HttpServletResponse response) {
        //DB에서 리프레시 토큰 값 삭제
        userRepository.updateUserRefreshTokenToNull(userDetails.getUsername());
        //쿠키를 제거함으로서 로그인 토큰 정보 제거
        removeCookie(response, "accessToken");
        removeCookie(response, "refreshToken");
    }


    public UserSubscribeDTO subscribeCheck() {
        UserDetails userDetails = globalService.extractFromSecurityContext();

        String userEmail = userDetails.getUsername();
        List<GroupDTO> groupDTO = groupRepository.findByUserEntity_UserEmail(userEmail).orElse(null);
        List<FriendDTO> friendDTO = friendRepository.findFriendListById(userEmail).orElse(null);
        UserSubscribeDTO userSubscribeDTO = new UserSubscribeDTO(friendDTO, groupDTO, userEmail);
        return userSubscribeDTO;
    }


    public void removeCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

}
