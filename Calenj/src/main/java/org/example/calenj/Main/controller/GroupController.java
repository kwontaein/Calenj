package org.example.calenj.Main.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.*;
import org.example.calenj.Main.model.GroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    //그룹 만들기
    @PostMapping("/api/makeGroup")
    public void makeGroup(@RequestBody GroupDTO groupDTO) {
        groupService.makeGroup(groupDTO.getGroupTitle()); // 해당 메소드에서 그룹 생성 및 그룹장 지정
    }

    //그룹 목록 불러오기
    @GetMapping("/api/groupList")
    public List<GroupDTO> groupList() {
        //그룹 목록 프론트 전달
        //그룹 이름 및 아이디만 전달해서 세부 정보를 다시 불러올 것인지, 아예 처음부터 모든 정보를 가져와서 보여줄 것인지 토의 필요
        return groupService.groupList();
    }

    //그룹 세부정보 가져오기
    @PostMapping("/api/groupDetail")
    public GroupDetailDTO groupDetail(@RequestParam(name = "groupId") UUID groupId) {
        GroupDetailDTO groupDetail = groupService.groupDetail(groupId).orElseThrow(() -> new RuntimeException("조회 실패"));
        return groupDetail;
    }

    // 임시로 만든 그룹 참여 코드 -> 공개 서버라면 참여 가능하게 만들 것
    @PostMapping("/api/joinGroup")
    public String joinGroup(@RequestParam(name = "groupId") UUID groupId, @RequestParam(name = "userId") String userId) {
        groupService.joinGroup(groupId);
        System.out.println("그룹 참가");
        return "a";
    }

    // 초대 링크 발급
//    @PostMapping("/api/inviteCode")
//    public String inviteCode(@RequestParam(name = "groupId") UUID groupId) { //그룹 초대
//        //알림 웹소켓 전송 or
////        String inviteCode = groupService.inviteCode(groupId);
////        System.out.println(inviteCode);
////        return inviteCode;
//    }

    // 그룹 초대 -> 초대 코드 발급 + 이벤트로 구분
    @PostMapping("/api/inviteGroup/")
    public String inviteGroup(@RequestParam(name = "groupId") UUID groupId) { //그룹 초대
        //알림 웹소켓 전송 or
//        groupService.inviteGroup(groupId);
        return "그룹 초대";
    }

    //공지 생성
    @PostMapping("api/makeNotice")
    public void makeNotice(@RequestBody GroupNoticeDTO groupNoticeDTO) {
        groupService.makeNotice(groupNoticeDTO.getNoticeContent(), groupNoticeDTO.getNoticeCreated(), groupNoticeDTO.getGroupId());
    }

    //공지 리스트
    @PostMapping("api/noticeList")
    public List<GroupNoticeDTO> noticeList(@RequestBody GroupNoticeDTO groupNoticeDTO) {
        return groupService.groupNoticeList(groupNoticeDTO.getGroupId());
    }

    //그룹공지 세부정보 가져오기
    @PostMapping("/api/noticeDetail")
    public GroupNoticeDTO noticeDetail(@RequestParam(name = "noticeId") UUID noticeId) {
        groupService.noticeViewCount(noticeId);
        GroupNoticeDTO noticeDetail = groupService.noticeDetail(noticeId);
        return noticeDetail;
    }


    @PostMapping("/api/makeVote")
    public void makeVote(@RequestBody GroupVoteDTO groupVoteDTO) {
        System.out.println(groupVoteDTO);
        groupService.makeVote(groupVoteDTO);
    }

    @PostMapping("api/voteList")
    public List<GroupVoteDTO> noticeList(@RequestBody GroupVoteDTO groupVoteDTO) {
        return groupService.groupVoteList(groupVoteDTO.getGroupId());
    }

    @PostMapping("/api/voteDetail")
    public GroupVoteDTO voteDetail(@RequestParam(name = "voteId") UUID voteId) {
        groupService.voteViewCount(voteId);
        GroupVoteDTO voteDetail = groupService.voteDetail(voteId);
        return voteDetail;
    }
}
