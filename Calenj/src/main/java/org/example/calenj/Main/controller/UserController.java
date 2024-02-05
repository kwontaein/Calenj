package org.example.calenj.Main.controller;

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
    public String sendEmail(@RequestParam String email) {
        return emailVerificationService.joinEmail(email);
    }

    @PostMapping("/api/codeValidation")
    public int codeValidation(@RequestParam(value = "code") String code, @RequestParam(value = "count", required = false) int count) { //인증번호 비교
        return userService.CodeValidate(code, count);
    }

    @PostMapping("/api/usersave")
    public int saveUser(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        return userService.saveUser2(userDTO);
    }

    @PostMapping("/api/testlogin")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        System.out.println("controller 실행");
        JwtToken jwtToken = userService.login(userDTO.getAccountid(), userDTO.getUser_password());

        System.out.println(jwtToken);
        return ResponseEntity.ok("Cookie Success");
    }

    @PostMapping("/api/IdDuplicated")
    public boolean isIdDuplicated(@RequestBody String userName) {
        //아이디 중복여부에 따른 논리 값 반환
        UserEntity user = userRepository.findByAccountid(userName).orElse(null);
        if (user == null) {
            System.out.println(user);
            return false;
        } else {
            System.out.println(user);
            return true;
        }
    }
}
