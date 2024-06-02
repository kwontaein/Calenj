package org.example.calenj.group.groupinfo.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.group.groupinfo.dto.request.GroupDetailRequest;
import org.example.calenj.group.groupinfo.dto.request.GroupRequest;
import org.example.calenj.group.groupinfo.dto.request.InviteCodeRequest;
import org.example.calenj.group.groupinfo.dto.response.GroupDetailResponse;
import org.example.calenj.group.groupinfo.dto.response.GroupResponse;
import org.example.calenj.group.groupinfo.dto.response.InviteCodeResponse;
import org.example.calenj.group.groupinfo.service.GroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    //그룹 만들기
    @PostMapping("/api/createGroup")
    public void createGroup(@RequestBody GroupRequest groupRequest) {
        groupService.createGroup(groupRequest.getGroupTitle()); // 해당 메소드에서 그룹 생성 및 그룹장 지정
    }

    //그룹 목록 불러오기
    @GetMapping("/api/groupList")
    public List<GroupResponse> groupList() {
        //그룹 목록 프론트 전달
        //그룹 이름 및 아이디만 전달해서 세부 정보를 다시 불러올 것인지, 아예 처음부터 모든 정보를 가져와서 보여줄 것인지 토의 필요
        return groupService.groupList();
    }

    //그룹 세부정보 가져오기
    @PostMapping("/api/groupDetail")
    public GroupDetailResponse groupDetail(@RequestBody GroupDetailRequest groupDetailrequest) {
        return groupService.groupDetail(groupDetailrequest.getGroupId()).orElseThrow(() -> new RuntimeException("조회 실패"));
    }

    // 임시로 만든 그룹 참여 코드 -> 공개 서버라면 참여 가능하게 만들 것
    // TODO 내가 이미 참여한 그룹일 경우 추가
    @PostMapping("/api/joinGroup")
    public String joinGroup(@RequestBody GroupDetailRequest groupDetailrequest) {
        groupService.joinGroup(groupDetailrequest.getGroupId());
        return "그룹 참가";
    }

    // 초대 링크 발급
    @PostMapping("/api/inviteCode")
    public String inviteCode(@RequestBody InviteCodeRequest inviteCodeRequest) { //그룹 초대
        //링크 테이블에 저장
        String inviteCode = "http://localhost:3000/inviteGroup/" + groupService.inviteCode(inviteCodeRequest);
        System.out.println(inviteCode);
        return inviteCode;
    }

    //초대 코드로 정보 받아오기. 없을 시 잘못된 코드임을 반환
    @PostMapping("/api/inviteGroup")
    public InviteCodeResponse inviteGroup(@RequestBody InviteCodeRequest inviteCodeRequest) {
        return groupService.inviteGroup(inviteCodeRequest.getInviteCode());
        // 메소드 내부 로직
    }


}
