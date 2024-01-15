package org.example.calenj.Main.controller;

import org.example.calenj.Main.Repository.Test2Repository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Test2;
import org.example.calenj.Main.domain.User;
import org.example.calenj.Main.model.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8000")
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
        return "리액트 스프링 연결 성공";
    }

    @GetMapping("/api/dbmsTest")
    @ResponseBody
    public String dbTest() {

        //승재 삽입 코드
        Test2 test2 = Test2.builder()
                .account_id("kosq3964")
                .user_password("dysj1234")
                .build();
        test2Repository.save(test2);

        //태인 삽입 코드
        User user = User.builder()
                .account_id("kosq3964")
                .user_password("1234")
                .user_email("kosq3964@naver.com")
                .user_phone("01025023964")
                .user_roll("user")
                .kakao_login(false)
                .naver_login(false)
                .user_join_date("2000-11-11")
                .withdrawed(false)
                .build();

        userRepository.save(user);

        return user.toString();
    }

    @GetMapping("/api/updateTest")
    public String dbUpdateTest() {
        //업데이트 테스트
        Test2 test2 = Test2.builder()
                .userid(2)
                .account_id("moon11")
                .user_password("dysj1234")
                .build();

        test2Repository.save(test2);
        return test2.toString();
    }

    @GetMapping("/api/deleteTest")
    public String dbDeleteTest() {
        //삭제 테스트
        test2Repository.delete(Test2.builder().userid(2).account_id("moon11").build());
        return "";
    }

    @GetMapping("/api/readTest")
    public String dbReadTest() {
        //select 테스트
        Optional<Test2> test = test2Repository.findById(2); //Optional을 사용하여 nullPointerException을 방지해줌을 알 수 있습니다.
        System.out.println(test.isPresent() ? test.get().getUserid() : "Nothing");

        Optional<User> user = userRepository.findById(1); //Optional을 사용하여 nullPointerException을 방지해줌을 알 수 있습니다.
        System.out.println(user.isPresent() ? user.get().getUser_id() : "Nothing");
        return "실행됨";
    }
}