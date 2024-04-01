package org.example.calenj.Main.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.*;
import org.example.calenj.Main.Repository.Group.GroupRepository;
import org.example.calenj.Main.Repository.Group.Group_NoticeRepository;
import org.example.calenj.Main.Repository.Group.Group_UserRepository;
import org.example.calenj.Main.Repository.Group.Group_VoteRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.example.calenj.Main.domain.Group.GroupNoticeEntity;
import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.example.calenj.Main.domain.Group.GroupVoteEntity;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GroupService {


    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final Group_UserRepository group_userRepository;
    private final GlobalService globalService;
    private final Group_NoticeRepository groupNoticeRepository;
    private final Group_VoteRepository groupVoteRepository;


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

        groupRepository
                .save(groupEntity);

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

    public List<GroupVoteDTO> groupVoteList(UUID groupId) {
        List<GroupVoteDTO> groupVoteDTOS = groupVoteRepository.findVoteByGroupId(groupId).orElseThrow(() -> new RuntimeException("공지를 찾을 수 없습니다."));
        return groupVoteDTOS;
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

    public void makeVote( UUID groupId, String voteCreated, String voteTitle, List<String> voteItems, String endDate, boolean isMultiple, boolean anonymous) {


        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드

        GroupEntity groupEntity = groupRepository.findByGroupId(groupId).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));


        GroupVoteEntity groupVoteEntity = GroupVoteEntity.GroupVoteBuilder()
                .voteCreater(userDetails.getUsername())
                .voteTitle(voteTitle)
                .voteItem(voteItems)
                .voteCreated(voteCreated)
                .voteEndDate(endDate)
                .isMultiple(isMultiple)
                .anonymous(anonymous)
                .group(groupEntity)
                .build();

        groupVoteRepository.save(groupVoteEntity);
    }
    public GroupVoteDTO voteDetail(UUID voteId) {
        GroupVoteDTO groupVoteDTO = groupVoteRepository.findByVoteId(voteId).orElseThrow(() -> new RuntimeException("공지가 존재하지 않습니다."));
        return groupVoteDTO;
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
}
