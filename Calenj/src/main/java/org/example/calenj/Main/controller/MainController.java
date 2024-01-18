package org.example.calenj.Main.controller;

import org.example.calenj.Main.DTO.UserDTO;
import org.example.calenj.Main.JWT.JwtToken;
import org.example.calenj.Main.Repository.Test2Repository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Test2;
import org.example.calenj.Main.domain.UserEntity;
import org.example.calenj.Main.model.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public String dbInsertTest(@RequestBody Test2 test2Info) { //객체로 받기
        mainService.saveTest2(test2Info);
        return "Insert 실행";
    }

    @PostMapping("/api/usersave")
    public int saveUser(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        return mainService.saveUser2(userDTO);
    }

    @PostMapping("/api/testlogin")
    public JwtToken login(@RequestBody UserDTO userDTO) {
        String accountid = userDTO.getAccountid();
        String password = userDTO.getUser_password();
        System.out.println("controller 실행");
        JwtToken jwtToken = mainService.login(accountid, password);
        return jwtToken;
    }

    @PostMapping("/api/testSuccess")
    public String successTest() {
        System.out.println("hi");
        return "successTest";
    }

    @PostMapping("/api/insertTest2")
    public String dbInsertTest2(@RequestBody UserEntity userEntityInfo) { //엔티티 형식으로 받기
        mainService.saveUser(userEntityInfo); //서비스의 저장 코드로 연결
        return "Insert2 실행";
    }

    @GetMapping("/api/updateTest")
    public String dbUpdateTest(@RequestBody Test2 test2Info) {
        mainService.updateTest(test2Info);
        return "update 실행";
    }

    @GetMapping("/api/deleteTest")
    public String dbDeleteTest(@RequestBody Test2 test2Info) {
        mainService.deleteTest(test2Info);
        return "delete 실행";
    }

    @PostMapping("/api/readTest")
    public String dbReadTest(@RequestBody Test2 test2Info) {
        mainService.selectTest2(test2Info);
        return "Test2";
    }

    @GetMapping("/api/readTest2")
    public String dbReadTest2(@RequestBody UserEntity userInfo) {
        mainService.selectUser(userInfo);
        return "User";
    }

}