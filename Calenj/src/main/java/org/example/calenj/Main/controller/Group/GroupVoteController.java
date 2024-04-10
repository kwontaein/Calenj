package org.example.calenj.Main.controller.Group;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Request.Group.GroupVoteRequest;
import org.example.calenj.Main.DTO.Response.Group.GroupVoteResponse;
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
    public void makeVote(@RequestBody GroupVoteRequest groupVoteRequest) {
        System.out.println(groupVoteRequest);
        groupService.makeVote(groupVoteRequest);
    }

    @PostMapping("api/voteList")
    public List<GroupVoteResponse> noticeList(@RequestBody GroupVoteRequest groupVoteRequest) {
        return groupService.groupVoteList(groupVoteRequest.getGroupId());
    }

    @PostMapping("/api/voteDetail")
    public GroupVoteResponse voteDetail(@RequestParam(name = "voteId") UUID voteId) {
        groupService.voteViewCount(voteId);
        GroupVoteResponse voteDetail = groupService.voteDetail(voteId);
        return voteDetail;
    }

    @PostMapping("/api/voteUpdate")
    public void voteUpdate(@RequestBody GroupVoteRequest groupVoteRequest) {
        groupService.updateVote(groupVoteRequest.getVoteId(), groupVoteRequest.getMyVote());
    }

    @PostMapping("/api/voteEndDateUpdate")
    public void voteEndDateUpdate(@RequestBody GroupVoteRequest groupVoteRequest) {
        groupService.voteEndDateUpdate(groupVoteRequest.getVoteId(), groupVoteRequest.getVoteEndDate());
    }
}
