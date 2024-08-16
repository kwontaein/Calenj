package org.example.calenj.group.groupnotice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.group.groupinfo.repository.GroupRepository;
import org.example.calenj.group.groupnotice.dto.request.GroupNoticeRequest;
import org.example.calenj.group.groupnotice.dto.response.GroupNoticeResponse;
import org.example.calenj.group.groupnotice.repository.Group_NoticeRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupNoticeService {
    private final GlobalService globalService;
    private final GroupRepository groupRepository;
    private final Group_NoticeRepository groupNoticeRepository;

    /**
     * 그룹 공지 생성
     *
     * @param groupNoticeRequest 공지 생성 정보
     */
    public void makeNotice(GroupNoticeRequest groupNoticeRequest) {


        String userId = globalService.extractFromSecurityContext().getUsername(); // SecurityContext에서 유저 정보 추출하는 메소드
        GroupEntity groupEntity = groupRepository.findByGroupId(groupNoticeRequest.getGroupId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));

        groupNoticeRepository.save(groupNoticeRequest.toEntity(userId, groupEntity));
    }

    /**
     * 그룹 공지 가져오기
     *
     * @param groupId 그룹아이디
     * @return 공지 목록 반환
     */
    public List<GroupNoticeResponse> groupNoticeList(UUID groupId) {
        return groupNoticeRepository.findNoticeByGroupId(groupId).orElseThrow(() -> new RuntimeException("공지를 찾을 수 없습니다."));
    }


    /**
     * 그룹 공지 디테일
     *
     * @param noticeId 공지아이디
     * @return 공지 정보 반환
     */
    public GroupNoticeResponse noticeDetail(UUID noticeId) {
        return groupNoticeRepository.findByNoticeId(noticeId).orElseThrow(() -> new RuntimeException("투표가 존재하지 않습니다."));
    }

    /**
     * 그룹 공지 조회한 사람 수 세기
     *
     * @param noticeId 공지 아이디
     */
    public void noticeViewCount(UUID noticeId) {

        String userId = globalService.extractFromSecurityContext().getUsername(); // SecurityContext에서 유저 정보 추출하는 메소드
        Optional<GroupNoticeResponse> groupNoticeDTO = groupNoticeRepository.findByNoticeId(noticeId);

        if (groupNoticeDTO.isPresent() && groupNoticeDTO.get().getNoticeWatcher() != null) {
            List<String> Viewerlist = new ArrayList<>(groupNoticeDTO.get().getNoticeWatcher());

            Viewerlist.add(userId);
            Viewerlist = Viewerlist.stream().distinct().collect(Collectors.toList());

            // JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String json = objectMapper.writeValueAsString(Viewerlist);

                //System.out.println("ViewerDuplicateList as JSON :" + json);

                groupNoticeRepository.updateNoticeWatcher(json, noticeId);
            } catch (JsonProcessingException e) {
                e.getMessage();
            }
        }
    }

}
