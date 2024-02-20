package org.example.calenj.Main.model;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class GrobalService {

    //SecurityContext에서 유저 정보 추출하는 메소드
    public UserDetails extractFromSecurityContext() { //id , password , 권한
        // SecurityContext에서 Authentication 객체 추출
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        // Authentication 객체에서 유저 정보 추출
        return (UserDetails) authentication.getPrincipal(); //->principal ->id , password , 권한
        // 유저 정보 사용
    }
}
