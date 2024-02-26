package org.example.calenj.Main.controller;

import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.model.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class MainController {

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
}