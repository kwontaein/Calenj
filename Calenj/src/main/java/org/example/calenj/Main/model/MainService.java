package org.example.calenj.Main.model;

import org.example.calenj.Main.Repository.Test2Repository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Test2;

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


}
