package org.example.calenj.Main.Service.Group;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.GroupDTO;
import org.example.calenj.Main.DTO.Group.GroupDetailDTO;
import org.example.calenj.Main.DTO.Group.GroupUserDTO;
import org.example.calenj.Main.DTO.Group.InviteCodeDTO;
import org.example.calenj.Main.Repository.Group.*;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.Service.GlobalService;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.example.calenj.Main.domain.Group.InviteCodeEntity;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final UserRepository userRepository;
    private final GlobalService globalService;
    private final GroupRepository groupRepository;
    private final Group_UserRepository group_userRepository;
    private final InviteCodeRepository inviteCodeRepository;


    //그룹 만들기
    public void makeGroup(String groupTitle) {

        LocalDate today = LocalDate.now();

        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드

        // 유저 이름으로 그룹 생성/
        GroupEntity groupEntity = GroupEntity.builder()
                .groupTitle(groupTitle)
                .groupCreated(String.valueOf(today))
                .groupCreater(userDetails.getUsername())
                .build();

        groupRepository.save(groupEntity);

        UserEntity userEntity = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        // 생성한 유저 역할 -> 관리자 로 지정해서 그룹 유저 테이블 저장
        GroupUserEntity groupUserEntity = GroupUserEntity.builder()
                .role(GroupUserEntity.GroupRoleType.Host)
                .group(groupEntity)
                .user(userEntity)
                .build();

        group_userRepository.save(groupUserEntity);
    }

    //그룹 목록 가져오기
    public List<GroupDTO> groupList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        String userEmail = userDetails.getUsername();
        return groupRepository.findByUserEntity_UserEmail(userEmail).orElseThrow(() -> new RuntimeException("그룹을 찾을 수 없습니다."));
    }


    //그룹 세부 정보 가져오기
    public Optional<GroupDetailDTO> groupDetail(UUID groupId) {
        Optional<GroupDTO> groupOptional = groupRepository.findGroupById(groupId);
        if (groupOptional.isPresent()) {
            GroupDTO groupDTO = groupOptional.get();
            List<GroupUserDTO> groupUsers = group_userRepository.findGroupUsers(groupDTO.getGroupId());
            // GroupDetailDTO 생성 -> 이유는 모르겠지만 두 엔티티를 따로 불러와서 DTO로 만들어줘야 함.
            // 아니면 생성자가 없다는 오류가 생긴다. (TODO 이유 찾아봐야함)
            GroupDetailDTO groupDetailDTO = new GroupDetailDTO(
                    groupDTO.getGroupId(),
                    groupDTO.getGroupTitle(),
                    groupDTO.getGroupCreated(),
                    groupDTO.getGroupCreater(),
                    groupUsers
            );
            return Optional.of(groupDetailDTO);
        } else {
            return Optional.empty();
        }
    }


    public void joinGroup(UUID groupId) {
        // 유저를 그룹에 추가하는 코드
        // SecurityContext 에서 유저 정보 추출하는 메소드
        // UserDetails userDetails = globalService.extractFromSecurityContext();
        GroupEntity groupEntity = groupRepository.findByGroupId(groupId).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));
        UserEntity userEntity = userRepository.findByUserEmail("zodls1128@gmail.com").orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        // 생성한 유저 역할 -> 멤버로 지정해서 그룹 유저 테이블 저장
        GroupUserEntity groupUserEntity = GroupUserEntity.builder()
                .role(GroupUserEntity.GroupRoleType.Member)
                .group(groupEntity)
                .user(userEntity)
                .build();

        group_userRepository.save(groupUserEntity);

    }

    public String inviteCode(InviteCodeDTO inviteCodeDTO) {

        Random rnd = new Random();
        StringBuffer buf = new StringBuffer();
        for (int i = 0; i < 8; i++) {
            // rnd.nextBoolean() 는 랜덤으로 true, false 를 리턴. true일 시 랜덤 한 소문자를,
            // false 일 시 랜덤 한 숫자를 StringBuffer 에 append 한다.
            if (rnd.nextBoolean()) {
                buf.append((char) ((int) (rnd.nextInt(26)) + 97));
            } else {
                buf.append((rnd.nextInt(10)));
            }
        }

        UserDetails userDetails = globalService.extractFromSecurityContext();
        UserEntity userEntity = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        GroupEntity groupEntity = groupRepository.findByGroupId(inviteCodeDTO.getGroupId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));

        inviteCodeRepository.save(InviteCodeEntity
                .builder()
                .inviteCode(buf.toString())
                .group(groupEntity)
                .user(userEntity)
                .endDateTime(globalService.nowTime())
                .build());

        return buf.toString();

    }

    //초대 코드로 그룹 정보 반환 -> 기간 만료 or 잘못된 코드시 정보 반환해야함
    public InviteCodeDTO inviteGroup(String inviteCode) {

        InviteCodeDTO inviteCodeDTO = inviteCodeRepository.findByInviteCode(inviteCode).orElseThrow(() -> new RuntimeException("잘못된 코드입니다"));

        int onlineCnt = inviteCodeRepository.onlineUserCount(inviteCode).orElse(0);
        int memberCnt = inviteCodeRepository.memberCount(inviteCode).orElse(0);

        inviteCodeDTO.setOnlineCount(onlineCnt);
        inviteCodeDTO.setOnlineCount(memberCnt);

        String enableUse = globalService.compareDate(inviteCodeDTO.getEndDateTime());
        System.out.println(enableUse);

        if (inviteCodeDTO.getGroupTitle() != null && enableUse.equals("useAble")) {
            inviteCodeDTO.setAbleCode("유효한 코드입니다");
            System.out.println("inviteCodeDTO.getInviteCode() : " + inviteCodeDTO);
        } else if (enableUse.equals("cannotUse")) {
            inviteCodeDTO.setAbleCode("만료된 코드입니다");
            System.out.println("inviteCodeDTO.getInviteCode() : " + inviteCodeDTO);
        } else {
            inviteCodeDTO.setAbleCode("잘못된 코드입니다");
            System.out.println("inviteCodeDTO.getInviteCode() : " + inviteCodeDTO);
        }
        return inviteCodeDTO;
    }

}
