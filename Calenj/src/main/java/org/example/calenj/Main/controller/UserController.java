package org.example.calenj.Main.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.calenj.Main.DTO.UserDTO;
import org.example.calenj.Main.DTO.ValidateDTO;
import org.example.calenj.Main.JWT.JwtToken;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    MainService mainService;

    @Autowired
    GrobalService grobalService;

    @Autowired
    ValidateDTO validateDTO;

    @Autowired
    PhoneverificationService phoneverificationService;

    @Autowired
    EmailVerificationService emailVerificationService;


    @PostMapping("/api/logout")
    public String logout(HttpServletResponse response) {
        UserDetails userDetails = grobalService.extractFromSecurityContext();
        userService.logout(userDetails, response);
        return "logout";
    }

    @PostMapping("/api/postCookie")
    public boolean checkCookie(HttpServletRequest request) {
        Cookie[] requestCookie = request.getCookies();
        return userService.checkUserToken(requestCookie);
    }

    @PostMapping("/api/sendMessage")
    public Map<String, Object> sendMessage(@RequestBody String phone) {

        Map<String, Object> responseMap = phoneverificationService.sendMessage(phone);

        System.out.println("본인인증 문자 전송");

        return responseMap;
    }

    @PostMapping("/api/sendEmail")
    public Object sendEmail(@RequestParam(name = "email") String email, HttpServletRequest request, HttpServletResponse response) {
        //이메일 중복체크 메소드 (이미 가입된 이메일 -false = 인증코드 발급 불가능)
        boolean checkDublidated = emailVerificationService.emailDuplicated(email);

        System.out.println("checkDublidated : " + checkDublidated);

        if (checkDublidated) {
            //이메일 중복 체크 후 이메일 발급 전 토큰 체크
            //토큰 발급 (만약 이메일토큰이 존재하고 유효할 경우 false 반환)
            boolean enableEmail = emailVerificationService.generateEmailValidateToken(request, response);

            if (enableEmail) {//토큰 체크 후 이메일 발급
                emailVerificationService.joinEmail(email);
                System.out.println(email + "로 이메일 인증코드 발급완료");
            }
        }


        return validateDTO.getEnableSendEmail().getEnableEmailEnum();
    }


    @PostMapping("/api/emailCodeValidation")
    public Integer emailCodeValidation(@RequestParam(value = "validationCode") String validationCode, @RequestParam(value = "email") String email, HttpServletRequest request, HttpServletResponse response) {

        System.out.println(email + "로 인증요청");

        emailVerificationService.checkValidationCode(validationCode, request, response);

        return validateDTO.getEmailValidState().getCode();
    }

    @PostMapping("/api/saveUser")
    public String saveUser(@RequestBody UserDTO userDTO, HttpServletRequest request, HttpServletResponse response) {

        System.out.println(userDTO);

        emailVerificationService.emailTokenValidation(request, response, true);
        return userService.saveUser(userDTO);
    }

    @GetMapping("/api/emailValidationState")
    public boolean checkEmailValidate() {

        if (validateDTO.getEmailValidState().getCode() == 200) {
            return true;
        }
        return false;
    }

    @GetMapping("/api/emailTokenExpiration")
    public Long emailTokenExpiration() {
        Long expriationTime = validateDTO.getExpirationTime();
        System.out.println("expriationTime : " + expriationTime);

        if (expriationTime != null) {
            return expriationTime;
        }
        return 0L;
    }

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        System.out.println("controller 실행");
        System.out.println("userDTO.getUserEmail() : " + userDTO.getUserEmail());
        JwtToken jwtToken = userService.login(userDTO.getUserEmail(), userDTO.getUserPassword());

        System.out.println(jwtToken);
        return ResponseEntity.ok("Cookie Success");
    }

    @PostMapping("/api/updateUser")
    public String updateUser() { //유저 업데이트
        userService.selectUserInfo();
        //유저 정보 불러와서 보여주고
        //정보를 바꾸려면 비밀번호 검증 후
        //프론트에서 바뀐 값 전달하기
        return "";
    }


}
