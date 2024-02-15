package org.example.calenj.Main.model;

import org.example.calenj.Main.DTO.GroupDTO;
import org.example.calenj.Main.Repository.GroupRepository;
import org.example.calenj.Main.Repository.Group_UserRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.example.calenj.Main.domain.Group.Group_UserEntity;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service

public class GroupService {

    @Autowired
    GroupRepository groupRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    Group_UserRepository group_userRepository;
    @Autowired
    GrobalService grobalService;

    public String makeGroup(String groupTitle, String groupCreated) {

        UserDetails userDetails = grobalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드

        // 유저 이름으로 그룹 생성
        GroupEntity groupEntity = GroupEntity.builder()
                .grouptitle(groupTitle)
                .groupcreated(groupCreated)
                .groupcreater(userDetails.getUsername())
                .build();
        groupRepository.save(groupEntity);
        System.out.println("그룹 생성");

        UserEntity userEntity = userRepository.findByAccountid(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        // 생성한 유저 역할 -> 관리자 로 지정해서 그룹 유저 테이블 저장
        Group_UserEntity groupUserEntity = Group_UserEntity.builder()
                .role(Group_UserEntity.GroupRoleType.Host)
                .group(groupEntity)
                .user(userEntity)
                .build();

        group_userRepository.save(groupUserEntity);
        System.out.println("유저 생성");
        return groupEntity.toString();
    }


    public Collection<GroupDTO> groupList() {
        UserDetails userDetails = grobalService.extractFromSecurityContext();
        String groupcreater = userDetails.getUsername();
        System.out.println("Username : " + groupcreater);
        Collection<GroupDTO> groupEntities = groupRepository.findbyGroupcreater("a").orElseThrow(() -> new RuntimeException("그룹을 찾을 수 없습니다."));
        System.out.println("그룹 목록 불러오기 Service");
        return groupEntities;
    }
}
