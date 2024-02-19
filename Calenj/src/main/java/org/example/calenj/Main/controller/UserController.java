package org.example.calenj.Main.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.calenj.Main.DTO.UserDTO;
import org.example.calenj.Main.DTO.ValidateDTO;
import org.example.calenj.Main.JWT.JwtToken;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.example.calenj.Main.model.EmailVerificationService;
import org.example.calenj.Main.model.MainService;
import org.example.calenj.Main.model.PhoneverificationService;
import org.example.calenj.Main.model.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    @PostMapping("/api/sendMessage")
    public Map<String, Object> sendMessage(@RequestBody String phone) {

        Map<String, Object> responseMap = phoneverificationService.sendMessage(phone);

        System.out.println("본인인증 문자 전송");

        return responseMap;
    }

    @PostMapping("/api/sendEmail")
    public String sendEmail(@RequestParam String email,HttpServletRequest request, HttpServletResponse response) {
        //이메일 중복체크 후 중복이 아닐 시 전송
        boolean checkDublidated = emailVerificationService.eamilDublicated(email);

        System.out.println("checkDublidated : "+checkDublidated);
        //존재하지 않은 이메일 -true (Test 시 주석처리)
        if(checkDublidated){
            //토큰 발급 (만약 이메일토큰이 존재하고 유효할 경우 false 반환)
            boolean enableEmail= emailVerificationService.generateEmailValidateToken(request, response);

            if(enableEmail) {//토큰 체크 후 이메일 발급
                emailVerificationService.joinEmail(email);
                System.out.println(email+"로 이메일 인증코드 발급완료");
                return "발급완료";
            }else{
                return "토큰정보확인";
            }

        }
        System.out.println(email+"은 이미 가입된 아이디입니다.");
        return "중복이메일.";
    }

  
    @PostMapping("/api/emailCodeValidation")
    public boolean emailCodeValidation(@RequestParam String validationCode, @RequestParam String email){
        System.out.println(email+"로 인증요청");
        return emailVerificationService.checkValidationCode(validationCode);

    }


    @PostMapping("/api/usersave")
    public int saveUser(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);

        return userService.saveUser(userDTO);
    }

    @PostMapping("/api/postCookie")
    public boolean checkCookie(HttpServletRequest request){
        Cookie[] requestCookie = request.getCookies();
        return userService.checkUserToken(requestCookie);

    }

    @PostMapping("/api/testlogin")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        System.out.println("controller 실행");
        JwtToken jwtToken = userService.login(userDTO.getAccountid(), userDTO.getUserPassword());

        System.out.println(jwtToken);
        return ResponseEntity.ok("Cookie Success");
    }



    @PostMapping("/api/IdDuplicated")
    public boolean isIdDuplicated(@RequestParam String userName) {
        //아이디 중복여부에 따른 논리 값 반환
        UserEntity user = userRepository.findByAccountid(userName).orElse(null);
        if (user == null) {
            System.out.println(user);
            return true;
        } else {
            System.out.println(user);
            return false;
        }
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
