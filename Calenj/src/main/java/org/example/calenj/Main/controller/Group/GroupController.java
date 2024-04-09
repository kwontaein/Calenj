package org.example.calenj.Main.controller.Group;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.GroupDTO;
import org.example.calenj.Main.DTO.Group.GroupDetailDTO;
import org.example.calenj.Main.DTO.Group.InviteCodeDTO;
import org.example.calenj.Main.Service.Group.GroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public GroupDetailDTO groupDetail(@RequestBody GroupDetailDTO request) {
        return groupService.groupDetail(request.getGroupId()).orElseThrow(() -> new RuntimeException("조회 실패"));
    }

    // 임시로 만든 그룹 참여 코드 -> 공개 서버라면 참여 가능하게 만들 것
    // TODO 내가 이미 참여한 그룹일 경우 추가
    @PostMapping("/api/joinGroup")
    public String joinGroup(@RequestBody GroupDetailDTO request) {
        groupService.joinGroup(request.getGroupId());
        System.out.println("그룹 참가");
        return "a";
    }

    // 초대 링크 발급
    @PostMapping("/api/inviteCode")
    public String inviteCode(@RequestBody InviteCodeDTO inviteCodeDTO) { //그룹 초대
        //링크 테이블에 저장
        String inviteCode = "http://localhost:3000/inviteGroup/" + groupService.inviteCode(inviteCodeDTO);
        System.out.println(inviteCode);
        return inviteCode;
    }

    //초대 코드로 정보 받아오기. 없을 시 잘못된 코드임을 반환
    @PostMapping("/api/inviteGroup")
    public InviteCodeDTO inviteGroup(@RequestBody InviteCodeDTO inviteCodeDTO) {
        System.out.println(inviteCodeDTO.getInviteCode());
        return groupService.inviteGroup(inviteCodeDTO.getInviteCode());
        // 메소드 내부 로직
    }


}
