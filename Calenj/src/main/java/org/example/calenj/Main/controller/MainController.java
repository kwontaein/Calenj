package org.example.calenj.Main.controller;

import org.example.calenj.Main.domain.Test2;
import org.example.calenj.Main.domain.User;
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
        //승재 코드
        Test2 test = new Test2();
        test.setAccount_id("dysj12");
        test.setUser_password("dysj1234");
        mainService.test(test);

        //성공
        User user = new User();
        user.setAccount_id("kosq3964");
        user.setKakao_login(false);
        user.setNaver_login(false);
        user.setWithdrawed(false);
        user.setUser_password("1234");
        user.setUser_roll("user");
        user.setUser_email("kosq3964@naver.com");
        user.setUser_phone("01025023964");
        user.setUser_join_date("2000-11-11");
        mainService.saveUser(user);
        return user.toString();
    }

    @GetMapping("/api/updateTest")
    public String dbUpdateTest(){
        //업데이트 테스트
        return "";
    }

    @GetMapping("/api/deleteTest")
    public String dbDeleteTest(){
        //삭제 테스트
        return "";
    }

    @GetMapping("/api/readTest")
    public String dbReadTest(){
        //select 테스트
        return "";
    }
    //bb
}