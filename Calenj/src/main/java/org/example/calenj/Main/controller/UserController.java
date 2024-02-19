package org.example.calenj.Main.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.calenj.Main.DTO.UserDTO;
import org.example.calenj.Main.DTO.ValidateDTO;
import org.example.calenj.Main.JWT.JwtToken;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.model.EmailVerificationService;
import org.example.calenj.Main.model.MainService;
import org.example.calenj.Main.model.PhoneverificationService;
import org.example.calenj.Main.model.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    ValidateDTO validateDTO;

    @Autowired
    PhoneverificationService phoneverificationService;

    @Autowired
    EmailVerificationService emailVerificationService;


    @PostMapping("/api/logout")
    public String logout(HttpServletResponse response) {
        //쿠키를 제거함으로서 로그인 토큰 정보 제거
        mainService.removeCookie(response);
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
    public String sendEmail(@RequestParam String email, HttpServletRequest request, HttpServletResponse response) {
        //이메일 중복체크
        boolean checkDublidated = emailVerificationService.emailDuplicated(email);

        System.out.println("checkDublidated : " + checkDublidated);
        //존재하지 않은 이메일 -true (Test 시 주석처리)
        if (checkDublidated) {
            //토큰 발급
            emailVerificationService.generateEmailValidateToken(request, response);
            //쿠키 저장 및 프론트 전달 <- 근데 이거 프론트에서 쿠키값 유효시간 측정해야 할거같은데 일단 보류
            //아니면 인증번호 재전송 메소드를 하나 더 만들고, 프론트에서 첫 전송 이후에 토큰 값이 있다면 -> 재전송 메소드로 보내게끔 수정해야함

            return emailVerificationService.joinEmail(email);

        }
        System.out.println(email + "은 이미 가입된 아이디입니다.");
        return "이미 가입이 완료된 이메일입니다.";
    }

    @PostMapping("/api/emailCodeValidation")
    public boolean emailCodeValidation(@RequestParam String validationCode, @RequestParam String email) {
        System.out.println(email + "로 인증요청");
        return emailVerificationService.checkValidationCode(validationCode);

    }

    @PostMapping("/api/saveUser")
    public String saveUser(@RequestBody UserDTO userDTO) {

        System.out.println(userDTO);
        return userService.saveUser(userDTO);
    }

    @PostMapping("/api/testlogin")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        System.out.println("controller 실행");
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
