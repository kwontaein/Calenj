package org.example.calenj.Main.controller;

import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.model.MainService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    final
    UserRepository userRepository;
    final
    MainService mainService;

    public MainController(UserRepository userRepository, MainService mainService) {
        this.userRepository = userRepository;
        this.mainService = mainService;
    }

    @PostMapping("/api/testPost") //웹페이지 호출
    public String Test() {
        return "Hello";
    }

    @GetMapping("/api/demo-web")
    @ResponseBody
    public String Hello() {
        return "리액트 스프링 연결 성공 : 안녕하세요! 캘린제이 프로젝트입니다!";
    }
}