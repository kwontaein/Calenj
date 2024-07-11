package org.example.calenj.user.service;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.calenj.calendar.domain.TagEntity;
import org.example.calenj.calendar.repository.TagRepository;
import org.example.calenj.event.service.EventService;
import org.example.calenj.friend.dto.response.FriendResponse;
import org.example.calenj.friend.repository.FriendRepository;
import org.example.calenj.global.JWT.JwtToken;
import org.example.calenj.global.JWT.JwtTokenProvider;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.global.service.RedisService;
import org.example.calenj.group.groupinfo.dto.response.GroupResponse;
import org.example.calenj.group.groupinfo.repository.GroupRepository;
import org.example.calenj.group.groupinfo.repository.Group_UserRepository;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.dto.request.UserRequest;
import org.example.calenj.user.dto.response.UserProfileResponse;
import org.example.calenj.user.dto.response.UserResponse;
import org.example.calenj.user.dto.response.UserSubscribeResponse;
import org.example.calenj.user.repository.UserRepository;
import org.example.calenj.websocket.service.WebSocketService;
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

    private final EventService eventService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TagRepository tagRepository;
    private final RedisService redisService;
    private final WebSocketService webSocketService;

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 회원가입
     *
     * @param userRequest 저장할 유저 정보
     **/
    public String saveUser(UserRequest userRequest) {
        //패스워드 암호화
        userRequest.setUserPassword(passwordEncoder.encode(userRequest.getUserPassword()));
        UserEntity user = userRequest.toEntity();
        user = userRepository.save(user);


        TagEntity tagEntity = TagEntity
                .builder()
                .userId(user)
                .tag("그룹 일정")
                .tagColor("#0070E8")
                .defaultTag(true)
                .build();

        TagEntity tagEntity2 = TagEntity
                .builder()
                .userId(user)
                .tag("약속 일정")
                .tagColor("#FFD369")
                .defaultTag(true)
                .build();

        tagRepository.save(tagEntity);
        tagRepository.save(tagEntity2);

        return userRequest.toEntity().getUserEmail();
    }

    /**
     * 유저정보 확인
     **/
    public UserResponse selectUserInfo() {
        UserEntity user = globalService.myUserEntity();
        return new UserResponse(user.getNickname(), user.getUserEmail(), user.getUserIntroduce(), user.getUserPhone(), user.getUserJoinDate(), user.getUserUsedName());
    }

    /**
     * 로그인
     *
     * @param accountId 저장할 유저 아이디
     * @param password  저장할 유저 비밀번호
     **/
    @Transactional
    public ResponseEntity<String> login(String accountId, String password) {
        //여기서 패스워드를 암호화 하는것도 옳지 않음.
        //로그인 프로세스 중에 패스워드를 다시 인코딩하면 안됨.
        //이미 Authentication 프로세스 내부에서 패스워드 비교를 실행하기 때문.

        JwtToken tokenInfo;
        UserEntity userEntity;

        try {
            // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
            // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(accountId, password);

            try {
                System.out.println(accountId);
                // 사용자 정보 반환
                userEntity = userRepository.findByUserEmail(accountId).orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
            } catch (UsernameNotFoundException e) {
                // 존재하지 않는 사용자인 경우
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("NON_EXISTENT_ERROR");
            }
            // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
            // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            // Spring Security 는 실제로 패스워드 값을 Authentication 객체에 저장하지 않습니다.
            // 따라서 authentication.getCredentials() 메서드를 호출하면 항상 null 이 반환됩니다.
            // 패스워드를 검증하기 위한 작업은 UserDetailsService 의 loadUserByUsername 메서드에서 이루어집니다.
            //검증이 되었다면 -> refreshToken 저장 유무를 불러와서, 있다면 토큰 재발급, 없다면 아예 발급, 만료 기간 여부에 따라서도 기능을 구분
            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            tokenInfo = jwtTokenProvider.generateToken(authentication);
            // 4. refreshToken 정보 저장
            redisService.saveUserToken(userEntity.getUserEmail(), tokenInfo.getRefreshToken());
            return ResponseEntity.status(HttpStatus.OK).body("로그인 성공");
        } catch (BadCredentialsException e) {
            // 비밀번호가 틀린 경우
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
                if ("accessToken".equals(cookie.getName()) && jwtTokenProvider.validateToken(cookie.getValue()).equals("true")) {
                    System.out.println("액세스 토큰 : " + cookie.getValue());

                    Authentication authentication = jwtTokenProvider.getAuthentication(cookie.getValue());
                    String refreshToken = redisService.getUserTokenById(authentication.getName());

                    if (refreshToken != null) {
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
     * @param response 쿠키를 삭제하기 위한 response
     **/
    @Transactional
    public void logout(HttpServletResponse response) {
        //쿠키를 제거함으로서 로그인 토큰 정보 제거
        UserDetails userDetails = globalService.extractFromSecurityContext();
        redisService.deleteUserToken(userDetails.getUsername());
        removeCookie(response, "accessToken");
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
     * 친구 요청 유저 프로필 받아오는 메소드
     *
     * @param userId 받아올 유저 아이디
     **/
    public UserProfileResponse getFriendUserProfile(UUID userId) {
        String myUserId = globalService.extractFromSecurityContext().getUsername();
        UserEntity userEntity = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("유저가 없서요"));

        UserProfileResponse userProfileResponse = getUserProfile(userId);

        userProfileResponse.setChatUUID(friendRepository.findFriendChatRoomId(userEntity.getUserId()).orElse(null));
        userProfileResponse.setEventContent(eventService.getEventContent(myUserId, userEntity.getUserId()));
        return userProfileResponse;
    }

    /**
     * 기본 유저 프로필 받아오는 메소드
     *
     * @param userId 받아올 유저 아이디
     **/
    public UserProfileResponse getUserProfile(UUID userId) {
        UserProfileResponse userProfileResponse = new UserProfileResponse();

        String myUserId = globalService.extractFromSecurityContext().getUsername();
        UserEntity userEntity = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("유저가 없서요"));
        userProfileResponse.setUserId(userEntity.getUserId());
        userProfileResponse.setUserName(userEntity.getUserUsedName());
        userProfileResponse.setNickName(userEntity.getNickname());
        userProfileResponse.setIntroduce(userEntity.getUserIntroduce());
        userProfileResponse.setJoinDate(userEntity.getUserJoinDate());
        //같이 속한 그룹
        userProfileResponse.setSameGroup(group_userRepository.findGroupIds(userEntity.getUserId(), UUID.fromString(myUserId)));
        //함께 아는 친구
        userProfileResponse.setSameFriend(friendRepository.DuplicateFriendList(UUID.fromString(myUserId), userId).orElse(null));
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
