package org.example.calenj.Main.model;

import org.example.calenj.Main.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class MainService {

    @Value("${jwt.secret}")
    private String secretKey;
    private Long expiredMs = 1000 * 60 * 60l;

    public String login(String userName, String password){

        return JwtUtil.createJwt(userName, secretKey, expiredMs);
    }
}
