package org.example.calenj.Main.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.*;
import org.example.calenj.Main.Repository.Group.*;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Group.*;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GroupService {


    private final UserRepository userRepository;
    private final GlobalService globalService;

    private final GroupRepository groupRepository;
    private final Group_UserRepository group_userRepository;
    private final Group_NoticeRepository groupNoticeRepository;

    private final Group_VoteRepository groupVoteRepository;
    private final VoteChoiceRepository voteChoiceRepository;
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
        List<GroupDTO> groupEntities = groupRepository.findByUserEntity_UserEmail(userEmail).orElseThrow(() -> new RuntimeException("그룹을 찾을 수 없습니다."));
        return groupEntities;
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

    //그룹 공지 생성
    public void makeNotice(String NoticeContent, String NoticeCreated, UUID groupId) {


        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드

        GroupEntity groupEntity = groupRepository.findByGroupId(groupId).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));

        List<String> Viewerlist = new ArrayList<>();
        //TODO :제거해야함
        Viewerlist.add("dysj11@naver.com");

        GroupNoticeEntity groupNoticeEntity = GroupNoticeEntity.GroupNoticeBuilder()
                .noticeContent(NoticeContent)
                .noticeCreated(NoticeCreated)
                .noticeCreater(userDetails.getUsername())
                .noticeWatcher(Viewerlist)
                .group(groupEntity)
                .build();


        groupNoticeRepository.save(groupNoticeEntity);
    }

    //그룹 공지 가져오기
    public List<GroupNoticeDTO> groupNoticeList(UUID groupId) {
        List<GroupNoticeDTO> groupNoticeDTOS = groupNoticeRepository.findNoticeByGroupId(groupId).orElseThrow(() -> new RuntimeException("공지를 찾을 수 없습니다."));
        return groupNoticeDTOS;
    }


    //그룹 공지 디테일
    public GroupNoticeDTO noticeDetail(UUID noticeId) {
        GroupNoticeDTO groupNoticeDTO = groupNoticeRepository.findByNoticeId(noticeId).orElseThrow(() -> new RuntimeException("투표가 존재하지 않습니다."));
        return groupNoticeDTO;
    }


    //그룹 공지 조회한 사람
    public void noticeViewCount(UUID noticeId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        Optional<GroupNoticeDTO> groupNoticeDTO = groupNoticeRepository.findByNoticeId(noticeId);

        if (groupNoticeDTO.isPresent() && groupNoticeDTO.get().getNoticeWatcher() != null) {
            List<String> Viewerlist = new ArrayList<>(groupNoticeDTO.get().getNoticeWatcher());

            Viewerlist.add(userDetails.getUsername());

            Set<String> ViewerDuplicates = new LinkedHashSet<>(Viewerlist); //중복제거

            List<String> ViewerDuplicateList = new ArrayList<>(ViewerDuplicates); //다시 list형식으로 변환

            // JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String json = objectMapper.writeValueAsString(ViewerDuplicateList);

                System.out.println("ViewerDuplicateList as JSON :" + json);

                groupNoticeRepository.updateNoticeWatcher(json, noticeId);
            } catch (JsonProcessingException e) {
                e.getMessage();
            }
        }
    }

    //groupVoteDTO.getVoteTitle(), groupVoteDTO.getVoteEndDate(), groupVoteDTO.getVoteItem(),groupVoteDTO.getIsMultiple(), groupVoteDTO.getAnonymous()

    public void makeVote(GroupVoteDTO groupVoteDTO) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드

        GroupEntity groupEntity = groupRepository.findByGroupId(groupVoteDTO.getGroupId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));
        List<String> Viewerlist = new ArrayList<>();
        //TODO :제거해야함
        Viewerlist.add("dysj11@naver.com");

        GroupVoteEntity groupVoteEntity = GroupVoteEntity.GroupVoteBuilder()
                .voteCreater(userDetails.getUsername())
                .voteTitle(groupVoteDTO.getVoteTitle())
                .voteCreated(groupVoteDTO.getVoteCreated())
                .voteEndDate(groupVoteDTO.getVoteEndDate())
                .isMultiple(groupVoteDTO.getIsMultiple())
                .anonymous(groupVoteDTO.getAnonymous())
                .voteWatcher(Viewerlist)
                .group(groupEntity)
                .build();

        groupVoteRepository.save(groupVoteEntity);
        UUID voteId = groupVoteEntity.getVoteId();

        GroupVoteEntity groupVoteEntity2 = groupVoteRepository.findGroupVoteEntityByVoteId(voteId).orElseThrow(() -> new RuntimeException("공지를 찾을 수 없습니다."));
        for (String items : groupVoteDTO.getPostedVoteChoiceDTO()) {
            voteChoiceRepository.save(VoteChoiceEntity
                    .builder()
                    .vote(groupVoteEntity2)
                    .voteItem(items)
                    .build());
        }
    }


    public List<GroupVoteDTO> groupVoteList(UUID groupId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        List<GroupVoteDTO> groupVoteDTOS = groupVoteRepository.findVoteByGroupId(groupId).orElseThrow(() -> new RuntimeException("공지를 찾을 수 없습니다."));
        return groupVoteDTOS;
    }

    public GroupVoteDTO voteDetail(UUID voteId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        GroupVoteDTO groupVoteDTO = groupVoteRepository.findByVoteId(voteId).orElseThrow(() -> new RuntimeException("공지가 존재하지 않습니다."));
        return groupVoteDTO;
    }

    //그룹 투표 조회한 사람
    public void voteViewCount(UUID voteId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        Optional<GroupVoteDTO> groupVoteDTO = groupVoteRepository.findByVoteId(voteId);

        //조회한 사람 갱신
        if (groupVoteDTO.isPresent() && groupVoteDTO.get().getVoteWatcher() != null) {
            List<String> Viewerlist = new ArrayList<>(groupVoteDTO.get().getVoteWatcher());

            Viewerlist.add(userDetails.getUsername());
            Set<String> ViewerDuplicates = new LinkedHashSet<>(Viewerlist); //중복제거

            List<String> ViewerDuplicateList = new ArrayList<>(ViewerDuplicates); //다시 list형식으로 변환

            // JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String json = objectMapper.writeValueAsString(ViewerDuplicateList);

                System.out.println("ViewerDuplicateList as JSON :" + json);

                groupVoteRepository.updateVoteWatcher(json, voteId);
            } catch (JsonProcessingException e) {
                e.getMessage();
            }
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
