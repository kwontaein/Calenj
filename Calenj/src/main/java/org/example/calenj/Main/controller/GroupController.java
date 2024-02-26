package org.example.calenj.Main.controller;

import org.example.calenj.Main.DTO.GroupDTO;
import org.example.calenj.Main.DTO.GroupDetailDTO;
import org.example.calenj.Main.model.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GroupController {

    @Autowired
    GroupService groupService;

    @PostMapping("/api/makeGroup")
    public void makeGroup(@RequestBody GroupDTO groupDTO) {
        groupService.makeGroup(groupDTO.getGrouptitle()); // 해당 메소드에서 그룹 생성 및 그룹장 지정
    }

    @PostMapping("/api/groupList")
    public List<GroupDTO> groupList() {
        //그룹 목록 프론트 전달
        //그룹 이름 및 아이디만 전달해서 세부 정보를 다시 불러올 것인지, 아예 처음부터 모든 정보를 가져와서 보여줄 것인지 토의 필요
        List<GroupDTO> a = groupService.groupList();
        System.out.println("a : " + a);
        return a;
    }

    @PostMapping("/api/groupDetail")
    public Optional<GroupDetailDTO> groupDetail(@RequestParam(name = "groupid") UUID groupid) {
        System.out.println("groupid : " + groupid);

        Optional<GroupDetailDTO> groupDetails = groupService.groupDetail(groupid);
        System.out.println("groupDetails  : " + groupDetails);
        return groupDetails;
    }

    @PostMapping("/api/inviteGroup")
    public String inviteGroup(@RequestParam("inviteCode") int inviteCode) { //그룹 초대
        return "";
    }
}
