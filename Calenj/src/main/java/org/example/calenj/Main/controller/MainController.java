package org.example.calenj.Main.controller;

import org.example.calenj.Main.model.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {
    //테스트 주석 달기 2
    //태인이가 요청한 주석
    @Autowired
    MainService mainService;

    @GetMapping("/api/demo-web")
    @ResponseBody
    public String Hello() {
        return "리액트 스프링 연결 성공 : 안녕하세요! 캘린제이 프로젝트입니다!";
    }

    @PostMapping("/api/postCookie")
    public boolean postCookie(@RequestHeader(value = HttpHeaders.COOKIE, required = false) String cookieHeader) { //쿠키 값 확인 메소드
        String cookieValue = mainService.extractTokenFromCookieHeader(cookieHeader, "accessToken");
        System.out.println(cookieValue);
        return cookieHeader != null;
    }
    

}