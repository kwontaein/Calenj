package org.example.calenj.Main.controller;

import org.example.calenj.Main.model.MainService;
import org.example.calenj.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class MainController {

    @Autowired
    MainService mainService;

    @GetMapping("/") //웹페이지 호출
    public String Test() {

        return "Hello";
    }

    @GetMapping("/api/demo-web")
    @ResponseBody
    public String Hello() {
        return "리액트 스프링 연결 성공";
    }

    @GetMapping("/api/dbmsTest")
    @ResponseBody
    public String dbTest() {
        User User = new User();
        User.setAccount_id("kosq3964");
        User.setKakao_login(false);
        User.setNaver_login(false);
        User.setWithdrawed(false);
        User.setUser_password("1234");
        User.setUser_roll("user");
        User.setUser_email("kosq3964@naver.com");
        User.setUser_phone("01025023964");
        User.setUser_join_date("2000-11-11");
        mainService.saveUser(User);
        return User.toString();
    }
}