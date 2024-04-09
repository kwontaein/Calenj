package org.example.calenj.Main.controller.User;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.User.UserDTO;
import org.example.calenj.Main.DTO.User.UserSubscribeDTO;
import org.example.calenj.Main.DTO.ValidateDTO;
import org.example.calenj.Main.Service.GlobalService;
import org.example.calenj.Main.Service.UserService;
import org.example.calenj.Main.Service.Verify.EmailVerificationService;
import org.example.calenj.Main.Service.Verify.PhoneVerificationService;
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

    private final ValidateDTO validateDTO;

    private final PhoneVerificationService phoneVerificationService;

    private final EmailVerificationService emailVerificationService;

    //개인 정보 부분------------------------------------------------------------------------------
    @PostMapping("/api/postCookie")
    public boolean checkCookie(HttpServletRequest request) {
        Cookie[] requestCookie = request.getCookies();
        return userService.checkUserToken(requestCookie);
    }

    @PostMapping("/api/saveUser")
    public String saveUser(@RequestBody UserDTO.Request userDTO, HttpServletResponse response) {
        validateDTO.clear();
        userService.removeCookie(response, "enableSendEmail");
        return userService.saveUser(userDTO);
    }

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody UserDTO.Request userDTO) {
        System.out.println("로그인?");
        return userService.login(userDTO.getUserEmail(), userDTO.getUserPassword());
    }

    @PostMapping("/api/logout")
    public String logout(HttpServletResponse response) {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        userService.logout(userDetails, response);
        return "logout";
    }

    @GetMapping("/api/subscribeCheck")
    public UserSubscribeDTO subscribeCheck() {
        return userService.subscribeCheck();
    }

    @PostMapping("/api/updateUser")
    public String updateUser() { //유저 업데이트
        userService.selectUserInfo();
        //유저 정보 불러와서 보여주고
        //정보를 바꾸려면 비밀번호 검증 후
        //프론트에서 바뀐 값 전달하기
        return "";
    }

    //메일 인증 부분------------------------------------------------------------------------------

    @PostMapping("/api/sendMessage")
    public Map<String, Object> sendMessage(@RequestBody String phone) {

        return phoneVerificationService.sendMessage(phone);
    }

    @PostMapping("/api/sendEmail")
    public Object sendEmail(@RequestParam(name = "email") String email, HttpServletRequest request, HttpServletResponse response) {
        //이메일 중복체크 메소드 (이미 가입된 이메일 -false = 인증코드 발급 불가능)
        boolean checkDuplicated = emailVerificationService.emailDuplicated(email);

        if (checkDuplicated) {
            //이메일 중복 체크 후 이메일 발급 전 토큰 체크
            //토큰 발급 (만약 이메일토큰이 존재하고 유효할 경우 false 반환)
            boolean enableEmail = emailVerificationService.generateEmailValidateToken(request, response);

            if (enableEmail) {//토큰 체크 후 이메일 발급
                emailVerificationService.joinEmail(email);
            }
        }
        return validateDTO.getEnableSendEmail().getEnableEmailEnum();
    }


    @PostMapping("/api/emailCodeValidation")
    public Integer emailCodeValidation(@RequestParam(value = "validationCode") String validationCode, HttpServletRequest request, HttpServletResponse response) {

        emailVerificationService.checkValidationCode(validationCode, request, response);

        return validateDTO.getEmailValidState().getCode();
    }

    @GetMapping("/api/emailValidationState")
    public boolean checkEmailValidate() {
        return validateDTO.getEmailValidState().getCode() == 200;
    }

    @GetMapping("/api/emailTokenExpiration")
    public Long emailTokenExpiration() {
        Long expirationTime = validateDTO.getExpirationTime();

        if (expirationTime != null) {
            return expirationTime;
        }
        return 0L;
    }

}
