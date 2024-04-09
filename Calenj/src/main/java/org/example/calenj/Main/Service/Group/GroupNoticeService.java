package org.example.calenj.Main.Service.Group;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.GroupNoticeDTO;
import org.example.calenj.Main.Repository.Group.GroupRepository;
import org.example.calenj.Main.Repository.Group.Group_NoticeRepository;
import org.example.calenj.Main.Service.GlobalService;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.example.calenj.Main.domain.Group.GroupNoticeEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GroupNoticeService {
    private final GlobalService globalService;
    private final GroupRepository groupRepository;
    private final Group_NoticeRepository groupNoticeRepository;

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

}
