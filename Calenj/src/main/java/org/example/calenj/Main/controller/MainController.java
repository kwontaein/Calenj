package org.example.calenj.Main.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.example.calenj.Main.DTO.UserDTO;
import org.example.calenj.Main.JWT.JwtToken;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.model.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {
    //테스트 주석 달기 2
    //태인이가 요청한 주석
    @Autowired
    UserRepository userRepository;
    @Autowired
    MainService mainService;

    @GetMapping("/") //웹페이지 호출
    public String Test() {

        return "Hello";
    }

    @GetMapping("/api/demo-web")
    @ResponseBody
    public String Hello() {
        return "리액트 스프링 연결 성공 : 안녕하세요! 캘린제이 프로젝트입니다!";
    }

    @PostMapping("/api/usersave")
    public int saveUser(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        return mainService.saveUser2(userDTO);
    }

    @PostMapping("/api/testlogin")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO, HttpServletResponse response) {
        System.out.println("controller 실행");

        JwtToken jwtToken = mainService.login(userDTO.getAccountid(), userDTO.getUser_password());

        Cookie cookie = mainService.createCookie("accessToken", jwtToken.getAccessToken());
        Cookie cookie2 = mainService.createCookie("refreshToken", jwtToken.getRefreshToken());

        // 응답 헤더에 쿠키 추가
        response.addCookie(cookie);
        response.addCookie(cookie2);

        System.out.println("cookie : " + cookie);
        System.out.println("cookie2 : " + cookie2);

        return ResponseEntity.ok("Cookie Success");
    }

    @PostMapping("/api/testSuccess")
    public String successTest() {
        System.out.println("hi");
        return "successTest";
    }

    @PostMapping("/api/postCookie")
    public boolean postCookie(@RequestHeader(value = HttpHeaders.COOKIE, required = true) String Cookie) {
        return Cookie != null;
    }

}