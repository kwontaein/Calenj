package org.example.calenj.Main.model;

import org.example.calenj.Main.Repository.TestRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Test;
import org.example.calenj.Main.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MainService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TestRepository testRepository; //리포지토리는 맵퍼를 포함 (맵퍼의 상위호환)

    //유저 세이브 (save)는 jpa 기본 제공 메소드
    public void saveUser(User user){
        System.out.println( "user : " + user.toString());
        userRepository.save(user);
    }
    //테스트 세이브 (save)는 jpa 기본 제공 메소드
    public void test(Test test){
        System.out.println( "test : " + test.toString());
        testRepository.save(test);
    }
}
