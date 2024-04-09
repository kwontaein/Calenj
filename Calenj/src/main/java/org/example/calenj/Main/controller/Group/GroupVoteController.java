package org.example.calenj.Main.controller.Group;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.GroupVoteDTO;
import org.example.calenj.Main.Service.Group.GroupVoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class GroupVoteController {

    private final GroupVoteService groupService;

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

    @PostMapping("/api/voteUpdate")
    public void voteUpdate(@RequestBody GroupVoteDTO groupVoteDTO) {
        groupService.updateVote(groupVoteDTO.getVoteId(), groupVoteDTO.getMyVote());
    }

    @PostMapping("/api/voteEndDateUpdate")
    public void voteEndDateUpdate(@RequestBody GroupVoteDTO groupVoteDTO) {
        groupService.voteEndDateUpdate(groupVoteDTO.getVoteId(), groupVoteDTO.getVoteEndDate());
    }
}
