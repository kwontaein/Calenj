package org.example.calenj.Main.model;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class GroupService {
    public String makeGroup(String groupTitle, String groupCreated) {
        UserDetails userDetails = extractFromSecurityContext();
        String username = userDetails.getUsername();

        // 추가적인 작업 수행
        // 유저 이름으로 그룹 생성

        // 생성한 유저 역할 -> 관리자 로 지정해서 그룹 유저 테이블 저장
        return username;
    }

    //SecurityContext에서 유저 정보 추출하는 메소드
    public UserDetails extractFromSecurityContext() {
        // SecurityContext에서 Authentication 객체 추출
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        // Authentication 객체에서 유저 정보 추출
        return (UserDetails) authentication.getPrincipal();
        // 유저 정보 사용
    }
}
