package org.example.calenj.Main.controller;

import org.example.calenj.Main.model.MainService;

import org.example.calenj.domain.Test2;
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
        Test2 test = new Test2();
        test.setAccount_id("dysj12");
        test.setUser_password("dysj1234");

        mainService.test(test);

        return "연습했어영";
    }
}