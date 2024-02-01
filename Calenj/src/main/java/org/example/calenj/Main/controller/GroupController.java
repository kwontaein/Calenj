package org.example.calenj.Main.controller;

import org.example.calenj.Main.DTO.GroupDTO;
import org.example.calenj.Main.model.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GroupController {

    @Autowired
    GroupService groupService;

    @PostMapping("/api/makeGroup")
    public String makeGroup(@RequestBody GroupDTO groupDTO) {
        String a = groupService.makeGroup(groupDTO.getGroup_title(), groupDTO.getGroup_created());
        return a;
    }

    //개인정보 업데이트 및 그룹 생성 후 진행하는 여러 기능(투표 등)

    // 1. 개인정보 업데이트 창 -> 개인정보 수정 + 친구 관리 + 본인인증(회원가입시)

    // 2. 추후 카카오 네이버

    // 3. 그룹 생성 후 기능 (투표 등)

    @PostMapping("/api/updateUser")
    public String updateUser(@Param("inviteCode") int inviteCode) { //유저 업데이트
        //유저 정보 불러와서 보여주고
        //정보를 바꾸려면 비밀번호 검증 후
        //프론트에서 바뀐 값 전달하기
        return "";
    }


    @PostMapping("/api/userVerification")
    public String userVerification(@Param("inviteCode") int inviteCode) { //본인인증
        // 휴대번호 혹은 이메일 인증
        // 두개 따로?
        return "";
    }

    @PostMapping("/api/inviteGroup")
    public String inviteGroup(@Param("inviteCode") int inviteCode) { //그룹 초대
        return "";
    }
}
