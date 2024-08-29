package org.example.calenj.group.groupnotice.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.group.groupinfo.repository.GroupRepository;
import org.example.calenj.group.groupnotice.domain.GroupNoticeEntity;
import org.example.calenj.group.groupnotice.dto.request.GroupNoticeRequest;
import org.example.calenj.group.groupnotice.dto.response.GroupNoticeResponse;
import org.example.calenj.group.groupnotice.repository.Group_NoticeRepository;
import org.example.calenj.websocket.service.WebSocketService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GroupNoticeService {
    private final GlobalService globalService;
    private final GroupRepository groupRepository;
    private final Group_NoticeRepository groupNoticeRepository;
    private final WebSocketService webSocketService;

    /**
     * 그룹 공지 생성
     *
     * @param groupNoticeRequest 공지 생성 정보
     */
    public void makeNotice(GroupNoticeRequest groupNoticeRequest) {

        String userId = globalService.extractFromSecurityContext().getUsername(); // SecurityContext에서 유저 정보 추출하는 메소드
        GroupEntity groupEntity = groupRepository.findByGroupId(groupNoticeRequest.getGroupId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));

        GroupNoticeEntity groupNoticeEntity = groupNoticeRepository.save(groupNoticeRequest.toEntity(userId, groupEntity));
        webSocketService.groupEventChat(groupEntity.getGroupId().toString(), userId, "notice", groupNoticeEntity.getNoticeId().toString());
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
        GroupNoticeResponse groupNoticeResponse = groupNoticeRepository.findByNoticeId(noticeId).orElse(null);

        if (groupNoticeResponse == null) {
            // 공지사항이 없을 경우 처리
            return;
        }
        Set<String> viewerSet = new HashSet<>(groupNoticeResponse.getNoticeWatcher());
        viewerSet.add(userId);
        String json = globalService.listToJson(new ArrayList<>(viewerSet));

        groupNoticeRepository.updateNoticeWatcher(json, noticeId);
    }

}
