package org.example.calenj.Main.model;

import org.example.calenj.Main.Repository.Test2Repository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Test2;

import org.example.calenj.Main.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MainService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Test2Repository test2Repository;



    public void test(Test2 test){
        test2Repository.save(test);
    }

    //유저 세이브 (save)는 jpa 기본 제공 메소드
    public void saveUser(User user){
        System.out.println( "user : " + user.toString());
        userRepository.save(user);
    }
}
