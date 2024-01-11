package org.example.calenj.Main.controller;

import org.example.calenj.Main.Repository.Test2Repository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Test2;
import org.example.calenj.Main.domain.User;
import org.example.calenj.Main.model.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    //테스트 주석 달기 2
    //태인이가 요청한 주석
    @Autowired
    Test2Repository test2Repository;
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

    @PostMapping("/api/insertTest")
    public String dbInsertTest(@RequestBody Test2 data) { //객체로 받기

        //승재 삽입 코드
        Test2 test2 = Test2.builder()
                .account_id(data.getAccount_id()) //getter로 받은 데이터 사용
                .user_password(data.getUser_password())
                .build();
        test2Repository.save(test2);

        return "Insert 실행";
    }

    @PostMapping("/api/insertTest2")
    public String dbInsertTest2(@RequestBody User data) { //객체로 받기

        //태인 삽입 코드
        User user = User.builder()
                .account_id(data.getAccount_id()) //getter로 받은 데이터 사용
                .user_password(data.getUser_password())
                .user_email(data.getUser_email())
                .user_phone(data.getUser_phone())
                .user_roll(data.getUser_roll())
                .kakao_login(data.isKakao_login())
                .naver_login(data.isNaver_login())
                .user_join_date(data.getUser_join_date())
                .withdrawed(data.isWithdrawed())
                .build();

        userRepository.save(user);
        return "Insert2 실행";
    }

    @GetMapping("/api/updateTest")
    public String dbUpdateTest() {
        //업데이트 테스트
        Test2 test2 = Test2.builder()
                .userid(1)
                .account_id("moon11")
                .user_password("dysj1234")
                .build();

        test2Repository.save(test2);
        return test2.toString();
    }

    @GetMapping("/api/deleteTest")
    public String dbDeleteTest() {
        //삭제 테스트
        test2Repository.delete(Test2.builder().userid(1).account_id("moon11").build());
        return "";
    }

    @GetMapping("/api/readTest")
    public String dbReadTest() {
        //select 테스트
        Optional<Test2> test = test2Repository.findById(1); //Optional을 사용하여 nullPointerException을 방지해줌을 알 수 있습니다.
        String result1 = (test.isPresent() ? test.toString() : "정보가 없습니다");

        Optional<User> user = userRepository.findById(1);
        String result2 = (user.isPresent() ? user.toString() : "정보가 없습니다");

        System.out.println(result1);
        System.out.println(result2);

        return "User : " + result2;
    }
}