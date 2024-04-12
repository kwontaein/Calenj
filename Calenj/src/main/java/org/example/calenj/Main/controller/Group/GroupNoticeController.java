package org.example.calenj.Main.controller.Group;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Request.Group.GroupNoticeRequest;
import org.example.calenj.Main.DTO.Response.Group.GroupNoticeResponse;
import org.example.calenj.Main.Service.Group.GroupNoticeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class GroupNoticeController {

    private final GroupNoticeService groupService;

    //공지 생성
    @PostMapping("api/makeNotice")
    public void makeNotice(@RequestBody GroupNoticeRequest groupNoticeRequest) {
        groupService.makeNotice(groupNoticeRequest.getNoticeContent(), groupNoticeRequest.getNoticeCreated(), groupNoticeRequest.getGroupId());
    }

    //공지 리스트
    @PostMapping("api/noticeList")
    public List<GroupNoticeResponse> noticeList(@RequestBody GroupNoticeRequest groupNoticeRequest) {
        return groupService.groupNoticeList(groupNoticeRequest.getGroupId());
    }

    //그룹공지 세부정보 가져오기
    @PostMapping("/api/noticeDetail")
    public GroupNoticeResponse noticeDetail(@RequestParam(name = "noticeId") UUID noticeId) {
        groupService.noticeViewCount(noticeId);
        return groupService.noticeDetail(noticeId);
    }

}
