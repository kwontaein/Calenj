package org.example.calenj.user.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.calenj.global.auth.EmailVerificationService;
import org.example.calenj.global.auth.PhoneVerificationService;
import org.example.calenj.global.auth.dto.request.ValidateRequest;
import org.example.calenj.global.auth.dto.response.ValidateResponse;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.global.service.RedisService;
import org.example.calenj.user.dto.request.UserRequest;
import org.example.calenj.user.dto.response.UserProfileResponse;
import org.example.calenj.user.dto.response.UserResponse;
import org.example.calenj.user.dto.response.UserSubscribeResponse;
import org.example.calenj.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final GlobalService globalService;

    private final RedisService redisService;

    private final PhoneVerificationService phoneVerificationService;

    private final EmailVerificationService emailVerificationService;

    //개인 정보 부분------------------------------------------------------------------------------

    /**
     * 쿠키 내 토큰 여부 확인
     */
    @PostMapping("/api/postCookie")
    public boolean checkCookie(HttpServletRequest request) {
        Cookie[] requestCookie = request.getCookies();
        return userService.checkUserToken(requestCookie);
    }

    /**
     * 회원가입
     */
    @PostMapping("/api/saveUser")
    public String saveUser(@RequestBody UserRequest userRequest) {
        return userService.saveUser(userRequest);
    }

    /**
     * 로그인
     */
    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody UserRequest userRequest) {
        return userService.login(userRequest.getUserEmail(), userRequest.getUserPassword());
    }

    /**
     * 로그아웃
     */
    @PostMapping("/api/logout")
    public String logout(HttpServletResponse response) {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        userService.logout(userDetails, response);
        return "logout";
    }

    /**
     * 내 구독 목록 확인(친구정보, 그룹정보)
     */
    @GetMapping("/api/subscribeCheck")
    public UserSubscribeResponse subscribeCheck() {
        return userService.subscribeCheck();
    }

    /**
     * 유저 정보
     */
    @GetMapping("/api/getUserInfo")
    public UserResponse getUserInfo() { //유저 프로필 업데이트
        return userService.selectUserInfo();
    }

    /**
     * 유저 닉네임 업데이트
     */
    @PutMapping("/api/updateUser")
    public ResponseEntity<String> updateUserNickName(@RequestBody UserRequest userRequest) {
        System.out.println(userRequest);
        userService.updateUserNickName(userRequest);
        return ResponseEntity.ok("사용자 정보가 업데이트되었습니다.");
    }

    /**
     * 유저 프로필 받아오기
     */
    @PostMapping("/api/getProfile")
    public UserProfileResponse getProfile(@RequestBody UserRequest userRequest) { //유저 프로필 표시
        return userService.getUserProfile(userRequest.getUserId());
    }

    //메일 인증 부분------------------------------------------------------------------------------

    /**
     * 휴대전화 메세지 전송
     */
    @PostMapping("/api/sendMessage")
    public Map<String, Object> sendMessage(@RequestBody String phone) {
        return phoneVerificationService.sendMessage(phone);
    }

    /**
     * 이메일 전송
     */
    @PostMapping("/api/sendEmail")
    public ValidateResponse sendEmail(@RequestBody ValidateRequest validateRequest) {
        String email = validateRequest.getEmail();
        //메일 전송 시->
        return emailVerificationService.joinEmail(email);
    }

    /**
     * 인증번호 인증
     */
    @PostMapping("/api/emailCodeValidation")
    public boolean emailCodeValidation(@RequestBody ValidateRequest validateRequest) {
        return emailVerificationService.checkValidationCode(validateRequest);
    }

    /**
     * 이건 뭐냐 ???
     */
    @GetMapping("/api/emailValidationState")
    public boolean checkEmailValidate() {
        return true;
    }

    /**
     * 이메일 인증 가능 시간
     */
    @GetMapping("/api/emailTokenExpiration")
    public Long emailTokenExpiration(@RequestBody ValidateRequest validateRequest) {
        return redisService.getRemainingTTL(validateRequest.getEmail());
    }

}
