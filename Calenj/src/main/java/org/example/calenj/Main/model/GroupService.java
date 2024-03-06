package org.example.calenj.Main.model;

import org.example.calenj.Main.DTO.Group.GroupDTO;
import org.example.calenj.Main.DTO.Group.GroupDetailDTO;
import org.example.calenj.Main.DTO.Group.GroupUserDTO;
import org.example.calenj.Main.Repository.GroupRepository;
import org.example.calenj.Main.Repository.Group_UserRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    
    //그룹 만들기
    public String makeGroup(String groupTitle) {

        LocalDate today = LocalDate.now();

        UserDetails userDetails = grobalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        System.out.println("userDetails : " + userDetails);

        // 유저 이름으로 그룹 생성
        GroupEntity groupEntity = GroupEntity.builder()
                .groupTitle(groupTitle)
                .groupCreated(String.valueOf(today))
                .groupCreater(userDetails.getUsername())
                .build();

        groupRepository.save(groupEntity);
        System.out.println("groupTitle : " + groupTitle);
        System.out.println("groupCreated : " + today);
        System.out.println("그룹 생성" + groupEntity);

        UserEntity userEntity = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        // 생성한 유저 역할 -> 관리자 로 지정해서 그룹 유저 테이블 저장
        GroupUserEntity groupUserEntity = GroupUserEntity.builder()
                .role(GroupUserEntity.GroupRoleType.Host)
                .group(groupEntity)
                .user(userEntity)
                .build();

        group_userRepository.save(groupUserEntity);
        System.out.println("유저 생성");
        return groupEntity.toString();
    }

    //그룹 목록 가져오기
    public List<GroupDTO> groupList() {
        UserDetails userDetails = grobalService.extractFromSecurityContext();
        String userEmail = userDetails.getUsername();

        System.out.println("userEmail : " + userEmail);
        List<GroupDTO> groupEntities = groupRepository.findByUserEntity_UserEmail(userEmail).orElseThrow(() -> new RuntimeException("그룹을 찾을 수 없습니다."));
        System.out.println("그룹 목록 불러오기 Service");
        return groupEntities;
    }


    //그룹 세부 정보 가져오기
    public Optional<GroupDetailDTO> groupDetail(UUID groupId) {
        System.out.println(" groupDetail 실행 1");
        Optional<GroupDTO> groupOptional = groupRepository.findGroupById(groupId);
        System.out.println(" groupDetail 실행 2 : " + groupOptional);
        if (groupOptional.isPresent()) {
            GroupDTO groupDTO = groupOptional.get();
            List<GroupUserDTO> groupUsers = groupRepository.findGroupUsers(groupDTO.getGroupId());

            System.out.println(" groupDetail 실행 3 : " + groupUsers);
            // GroupDetailDTO 생성
            GroupDetailDTO groupDetailDTO = new GroupDetailDTO(
                    groupDTO.getGroupId(),
                    groupDTO.getGroupTitle(),
                    groupDTO.getGroupCreated(),
                    groupDTO.getGroupCreater(),
                    groupUsers
            );

            System.out.println(" groupDetail 실행 4 : " + groupDetailDTO);
            return Optional.of(groupDetailDTO);
        } else {
            return Optional.empty();
        }
    }

}
