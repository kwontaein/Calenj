package org.example.calenj.Main.controller;

import org.example.calenj.Main.DTO.GroupDTO;
import org.example.calenj.Main.model.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GroupController {

    @Autowired
    GroupService groupService;

    @PostMapping("/api/makeGroup")
    public String makeGroup(@RequestBody GroupDTO groupDTO) {
        
        String a = groupService.makeGroup(groupDTO.getGrouptitle(), groupDTO.getGroupcreated()); // 해당 메소드에서 그룹 생성 및 그룹장 지정
        return a;
    }

    @PostMapping("/api/groupList")
    public Collection<GroupDTO> groupList() {
        //그룹 목록 프론트 전달
        //그룹 이름 및 아이디만 전달해서 세부 정보를 다시 불러올 것인지, 아예 처음부터 모든 정보를 가져와서 보여줄 것인지 토의 필요
        Collection<GroupDTO> a = groupService.groupList();
        System.out.println("a : " + a);
        return a;
    }

    @PostMapping("/api/groupDetail")
    public String groupDetail() {
        //그룹 세부 정보 프론트에 전달
        //토의 후 해당 부분 결정
        return "";
    }

    @PostMapping("/api/inviteGroup")
    public String inviteGroup(@Param("inviteCode") int inviteCode) { //그룹 초대
        return "";
    }
}
