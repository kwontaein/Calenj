package org.example.calenj.Main.Service.Group;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Request.Group.InviteCodeRequest;
import org.example.calenj.Main.DTO.Response.Group.GroupDetailResponse;
import org.example.calenj.Main.DTO.Response.Group.GroupResponse;
import org.example.calenj.Main.DTO.Response.Group.GroupUserResponse;
import org.example.calenj.Main.DTO.Response.Group.InviteCodeResponse;
import org.example.calenj.Main.Repository.Group.GroupRepository;
import org.example.calenj.Main.Repository.Group.Group_UserRepository;
import org.example.calenj.Main.Repository.Group.InviteCodeRepository;
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
    public List<GroupResponse> groupList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        String userEmail = userDetails.getUsername();
        return groupRepository.findByUserEntity_UserEmail(userEmail).orElseThrow(() -> new RuntimeException("그룹을 찾을 수 없습니다."));
    }


    //그룹 세부 정보 가져오기
    public Optional<GroupDetailResponse> groupDetail(UUID groupId) {
        Optional<GroupResponse> groupOptional = groupRepository.findGroupById(groupId);
        if (groupOptional.isPresent()) {
            GroupResponse groupResponse = groupOptional.get();
            List<GroupUserResponse> groupUsers = group_userRepository.findGroupUsers(groupResponse.getGroupId());
            // GroupDetailDTO 생성 -> 이유는 모르겠지만 두 엔티티를 따로 불러와서 DTO로 만들어줘야 함.
            // 아니면 생성자가 없다는 오류가 생긴다. (TODO 이유 찾아봐야함)
            GroupDetailResponse groupDetailResponse = new GroupDetailResponse(
                    groupResponse.getGroupId(),
                    groupResponse.getGroupTitle(),
                    groupResponse.getGroupCreated(),
                    groupResponse.getGroupCreater(),
                    groupUsers
            );
            return Optional.of(groupDetailResponse);
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

    public String inviteCode(InviteCodeRequest inviteCodeRequest) {

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
        GroupEntity groupEntity = groupRepository.findByGroupId(inviteCodeRequest.getGroupId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));

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
    public InviteCodeResponse inviteGroup(String inviteCode) {

        InviteCodeResponse inviteCodeResponse = inviteCodeRepository.findByInviteCode(inviteCode).orElseThrow(() -> new RuntimeException("잘못된 코드입니다"));

        int onlineCnt = inviteCodeRepository.onlineUserCount(inviteCode).orElse(0);
        int memberCnt = inviteCodeRepository.memberCount(inviteCode).orElse(0);

        inviteCodeResponse.setOnlineCount(onlineCnt);
        inviteCodeResponse.setOnlineCount(memberCnt);

        String enableUse = globalService.compareDate(inviteCodeResponse.getEndDateTime());
        System.out.println(enableUse);

        if (inviteCodeResponse.getGroupTitle() != null && enableUse.equals("useAble")) {
            inviteCodeResponse.setAbleCode("유효한 코드입니다");
            System.out.println("inviteCodeDTO.getInviteCode() : " + inviteCodeResponse);
        } else if (enableUse.equals("cannotUse")) {
            inviteCodeResponse.setAbleCode("만료된 코드입니다");
            System.out.println("inviteCodeDTO.getInviteCode() : " + inviteCodeResponse);
        } else {
            inviteCodeResponse.setAbleCode("잘못된 코드입니다");
            System.out.println("inviteCodeDTO.getInviteCode() : " + inviteCodeResponse);
        }
        return inviteCodeResponse;
    }

}