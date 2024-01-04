package org.example.calenj.Main.model;

import org.example.calenj.Main.Repository.TestRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.domain.Test;
import org.example.calenj.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MainService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TestRepository testRepository;

    public void saveUser(User user){
        userRepository.save(user);
    }

    public void test(Test test){
        testRepository.save(test);
    }
}
