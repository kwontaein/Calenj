package org.example.calenj.Main.controller.Group;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.GroupNoticeDTO;
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

}
