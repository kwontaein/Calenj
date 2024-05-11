package org.example.calenj.user.service;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.calenj.friend.dto.response.FriendResponse;
import org.example.calenj.friend.repository.FriendRepository;
import org.example.calenj.global.JWT.JwtToken;
import org.example.calenj.global.JWT.JwtTokenProvider;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.group.groupinfo.dto.response.GroupResponse;
import org.example.calenj.group.groupinfo.repository.GroupRepository;
import org.example.calenj.group.groupinfo.repository.Group_UserRepository;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.dto.request.UserRequest;
import org.example.calenj.user.dto.response.UserProfileResponse;
import org.example.calenj.user.dto.response.UserResponse;
import org.example.calenj.user.dto.response.UserSubscribeResponse;
import org.example.calenj.user.repository.UserRepository;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GlobalService globalService;
    private final GroupRepository groupRepository;
    private final Group_UserRepository group_userRepository;
    private final FriendRepository friendRepository;


    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 회원가입
     *
     * @param userRequest 저장할 유저 정보
     **/
    public String saveUser(UserRequest userRequest) {
        //패스워드 암호화
        userRequest.setUserPassword(passwordEncoder.encode(userRequest.getUserPassword()));
        userRepository.save(userRequest.toEntity());
        return userRequest.toEntity().getUserEmail();
    }

    /**
     * 유저정보 확인
     **/
    public UserResponse selectUserInfo() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        Optional<UserEntity> user = userRepository.findByUserEmail(userDetails.getUsername());
        if (user.isEmpty()) {
            return null;
        }

        UserResponse userResponse = new UserResponse(user.get().getNickname(), user.get().getUserEmail(), user.get().getUserPhone(), user.get().getUserJoinDate());
        return userResponse;

    }

    /**
     * 로그인
     *
     * @param accountid 저장할 유저 아이디
     * @param password  저장할 유저 비밀번호
     **/
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
                System.out.println(accountid);
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
            System.out.println("authentication : " + authentication);
            // 4. refreshToken 정보 저장
            userRepository.updateUserRefreshToken(tokenInfo.getRefreshToken(), userEntity.getUserEmail());


            return ResponseEntity.status(HttpStatus.OK).body("로그인 성공");
        } catch (BadCredentialsException e) {
            // 비밀번호가 틀린 경우
            System.out.println("2");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("PW_ERROR");
        }

    }

    /**
     * 쿠키 체크
     *
     * @param requestCookie 검사할 쿠키 목록
     **/
    public boolean checkUserToken(Cookie[] requestCookie) {
        boolean checkCookie = false;

        if (requestCookie != null) {
            for (Cookie cookie : requestCookie) {
                if ("refreshToken".equals(cookie.getName())) {
                    System.out.println(cookie.getValue());
                    UserEntity userEntity = userRepository.findByRefreshToken(cookie.getValue())
                            .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
                    if (userEntity != null) {
                        checkCookie = true;
                    }
                }
            }

        }
        System.out.println("checkCookie : " + checkCookie);
        return checkCookie;
    }

    /**
     * 로그아웃
     *
     * @param userDetails 시큐리티 유저 정보
     * @param response    쿠키를 삭제하기 위한 response
     **/
    @Transactional
    public void logout(UserDetails userDetails, HttpServletResponse response) {
        //DB에서 리프레시 토큰 값 삭제
        userRepository.updateUserRefreshTokenToNull(userDetails.getUsername());
        //쿠키를 제거함으로서 로그인 토큰 정보 제거
        removeCookie(response, "accessToken");
        removeCookie(response, "refreshToken");
    }

    /**
     * 유저 구독 정보 확인 (웹소켓)
     **/
    public UserSubscribeResponse subscribeCheck() {
        UserDetails userDetails = globalService.extractFromSecurityContext();

        String userId = userDetails.getUsername();
        UserEntity userEntity = userRepository.findByUserId(UUID.fromString(userId)).orElseThrow(() -> new RuntimeException("존재하지 않는 이메일입니다."));

        List<GroupResponse> groupResponse = groupRepository.findByUserEntity_UserId(UUID.fromString(userId)).orElse(null);
        List<FriendResponse> friendResponse = friendRepository.findFriendListById(UUID.fromString(userId)).orElse(null);
        System.out.println(friendResponse);
        return new UserSubscribeResponse(friendResponse, groupResponse, String.valueOf(userEntity.getUserId()));
    }

    /**
     * 쿠키 제거
     *
     * @param response 쿠키를 삭제하기 위한 response
     * @param name     쿠키 이름
     **/
    public void removeCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    /**
     * 유저 프로필 받아오는 메소드
     *
     * @param userEmail 유저 이메일
     **/
    public UserProfileResponse getUserProfile(String userEmail) {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        String myUserId = userDetails.getUsername();
        System.out.println("userEmail : " + userEmail);

        UserEntity user = userRepository.findByUserEmail(userEmail).orElseThrow(RuntimeException::new);
        UserProfileResponse userProfileResponse = new UserProfileResponse();

        userProfileResponse.setIntroduce(user.getUserIntroduce());
        userProfileResponse.setJoinDate(user.getUserJoinDate());
        userProfileResponse.setSameGroup(group_userRepository.findGroupIds(userEmail, myUserId));
        userProfileResponse.setChatUUID(friendRepository.findFriendChattRoomId(user.getUserId()).orElse(null));
        return userProfileResponse;
    }

    /**
     * 유저 정보 업데이트
     *
     * @param userRequest 업데이트할 유저 정보
     **/
    public void updateUserNickName(UserRequest userRequest) {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        String myUserId = userDetails.getUsername();
        userRepository.updateUserNickName(userRequest.getNickname(), myUserId);
    }
}
