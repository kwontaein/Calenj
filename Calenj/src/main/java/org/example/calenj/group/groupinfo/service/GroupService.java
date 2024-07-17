package org.example.calenj.group.groupinfo.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.group.groupinfo.domain.GroupUserEntity;
import org.example.calenj.group.groupinfo.domain.InviteCodeEntity;
import org.example.calenj.group.groupinfo.dto.request.InviteCodeRequest;
import org.example.calenj.group.groupinfo.dto.response.GroupDetailResponse;
import org.example.calenj.group.groupinfo.dto.response.GroupResponse;
import org.example.calenj.group.groupinfo.dto.response.GroupUserResponse;
import org.example.calenj.group.groupinfo.dto.response.InviteCodeResponse;
import org.example.calenj.group.groupinfo.repository.GroupRepository;
import org.example.calenj.group.groupinfo.repository.Group_UserRepository;
import org.example.calenj.group.groupinfo.repository.InviteCodeRepository;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.repository.UserRepository;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final UserRepository userRepository;
    private final GlobalService globalService;
    private final GroupRepository groupRepository;
    private final Group_UserRepository group_userRepository;
    private final InviteCodeRepository inviteCodeRepository;
    private final SimpUserRegistry simpUserRegistry;

    /**
     * 그룹 생성
     *
     * @param groupTitle 생성할 그룹 이름
     */
    public void createGroup(String groupTitle) {

        LocalDate today = LocalDate.now();

        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드

        // 유저 이름으로 그룹 생성/
        GroupEntity groupEntity = GroupEntity.builder()
                .groupTitle(groupTitle)
                .groupCreated(String.valueOf(today))
                .groupCreator(userDetails.getUsername())
                .build();

        groupRepository.save(groupEntity);

        UserEntity userEntity = userRepository.findByUserId(UUID.fromString(userDetails.getUsername()))
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        // 생성한 유저 역할 -> 관리자 로 지정해서 그룹 유저 테이블 저장
        GroupUserEntity groupUserEntity = GroupUserEntity.builder()
                .role(GroupUserEntity.GroupRoleType.Host)
                .group(groupEntity)
                .user(userEntity)
                .build();

        group_userRepository.save(groupUserEntity);

        // 그룹 파일생성
        try (FileOutputStream stream = new FileOutputStream("C:\\chat\\chat" + groupUserEntity.getGroup().getGroupId(), true)) {
            String Title = "시작라인$어서오세요 $ $ $ $\n";
            stream.write(Title.getBytes(StandardCharsets.UTF_8));
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    /**
     * 그룹 목록 가져오기
     *
     * @return 내가 속한 그룹 목록
     */
    public List<GroupResponse> groupList() {
        String userId = globalService.extractFromSecurityContext().getUsername();
        return groupRepository.findByUserEntity_UserId(UUID.fromString(userId)).orElseThrow(() -> new RuntimeException("그룹을 찾을 수 없습니다."));
    }


    /**
     * 그룹 세부 정보 가져오기
     *
     * @param groupId 정보 가져올 그룹아이디
     * @return 세부 정보
     */
    public Optional<GroupDetailResponse> groupDetail(UUID groupId) {
        Optional<GroupResponse> groupOptional = groupRepository.findGroupById(groupId);
        if (groupOptional.isPresent()) {
            GroupResponse groupResponse = groupOptional.get();
            List<GroupUserResponse> groupUsers = group_userRepository.findGroupUsers(groupResponse.getGroupId());

            GroupDetailResponse groupDetailResponse = new GroupDetailResponse(
                    groupResponse.getGroupId(),
                    groupResponse.getGroupTitle(),
                    groupResponse.getGroupCreated(),
                    groupResponse.getGroupCreator(),
                    groupUsers
            );
            return Optional.of(groupDetailResponse);
        } else {
            return Optional.empty();
        }
    }


    /**
     * 그룹에 참여하기
     *
     * @param groupId 전달받은 그룹아이디
     */
    public void joinGroup(UUID groupId) {
        GroupEntity groupEntity = groupRepository.findByGroupId(groupId).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));
        // 생성한 유저 역할 -> 멤버로 지정해서 그룹 유저 테이블 저장
        GroupUserEntity groupUserEntity = GroupUserEntity.builder()
                .role(GroupUserEntity.GroupRoleType.Member)
                .group(groupEntity)
                .user(globalService.myUserEntity())
                .build();
        group_userRepository.save(groupUserEntity);
    }

    /**
     * 초대 코드 생성하기
     *
     * @param inviteCodeRequest 초대코드 생성 요청 정보
     * @return 초대 코드 8자리
     */
    public String inviteCode(InviteCodeRequest inviteCodeRequest) {
        LocalDateTime now = LocalDateTime.now();
        Random rnd = new Random();
        StringBuilder buf = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            if (rnd.nextBoolean()) {
                buf.append((char) ((rnd.nextInt(26)) + 97));
            } else {
                buf.append((rnd.nextInt(10)));
            }
        }

        GroupEntity groupEntity = groupRepository.findByGroupId(inviteCodeRequest.getGroupId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));

        inviteCodeRepository.save(InviteCodeEntity
                .builder()
                .inviteCode(buf.toString())
                .group(groupEntity)
                .user(globalService.myUserEntity())
                .endDateTime(globalService.plusDate(now, inviteCodeRequest.getDuring()))
                .build());

        return buf.toString();

    }

    /**
     * 초대 코드로 그룹 정보 반환 -> 기간 만료 or 잘못된 코드시 오류 반환해야함
     *
     * @param inviteCode 초대 코드
     * @return 코드로 그룹 정보 반환
     */
    public InviteCodeResponse inviteGroup(String inviteCode) {

        InviteCodeResponse inviteCodeResponse = inviteCodeRepository.findByInviteCode(inviteCode).orElseThrow(() -> new RuntimeException("잘못된 코드입니다"));

        inviteCodeResponse.setOnlineCount(getUsers(inviteCodeResponse.getGroupId().toString()));

        String enableUse = globalService.compareDate(inviteCodeResponse.getEndDateTime());

        if (inviteCodeResponse.getGroupTitle() != null && enableUse.equals("useAble")) {
            inviteCodeResponse.setAbleCode("유효한 코드입니다");
        } else if (enableUse.equals("cannotUse")) {
            inviteCodeResponse.setAbleCode("만료된 코드입니다");
        } else {
            inviteCodeResponse.setAbleCode("잘못된 코드입니다");
        }
        return inviteCodeResponse;
    }

    /**
     * 해당 그룹에 온라인인 유저 반환
     *
     * @param param 그룹아이디
     * @return 온라인 유저 수
     */
    public int getUsers(String param) {
        Set<SimpUser> simpUsers = simpUserRegistry.getUsers();

        Set<String> filteredUserNames = simpUsers.stream()
                .filter(simpUser -> simpUser.getSessions().stream()
                        .anyMatch(session -> session.getSubscriptions().stream()
                                .anyMatch(subscription -> subscription.getDestination().contains(param)
                                )))
                .map(SimpUser::getName)
                .collect(Collectors.toSet());

        System.out.println("filteredUserNames : " + filteredUserNames);
        return filteredUserNames.size();
    }

    /**
     * Scheduled 를 통해 시간이 지난 코드 자동 삭제
     */
    @Scheduled(fixedDelay = 1000 * 60 * 30) // 30분마다 실행
    private void scheduledInviteCode() {
        // inviteCodeRepository.delete();
    }
}
