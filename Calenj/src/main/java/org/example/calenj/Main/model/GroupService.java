package org.example.calenj.Main.model;

import org.example.calenj.Main.Repository.GroupRepository;
import org.example.calenj.Main.Repository.Group_UserRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.example.calenj.Main.domain.Group.Group_UserEntity;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service

public class GroupService {

    @Autowired
    GroupRepository groupRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    Group_UserRepository group_userRepository;

    public String makeGroup(String groupTitle, String groupCreated) {

        UserDetails userDetails = extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드

        // 유저 이름으로 그룹 생성
        GroupEntity groupEntity = GroupEntity.builder()
                .group_title(groupTitle)
                .group_created(groupCreated)
                .group_creater(userDetails.getUsername())
                .build();
        groupRepository.save(groupEntity);
        System.out.println("그룹 생성");

        UserEntity userEntity = userRepository.findByAccountid(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        // 생성한 유저 역할 -> 관리자 로 지정해서 그룹 유저 테이블 저장
        Group_UserEntity groupUserEntity = Group_UserEntity.builder()
                .role("Group_Amdin")
                .group(groupEntity)
                .user(userEntity)
                .build();
        group_userRepository.save(groupUserEntity);
        System.out.println("유저 생성");
        return groupEntity.toString();
    }

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
