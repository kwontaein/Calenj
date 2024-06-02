package org.example.calenj.group.groupvote.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.group.groupvote.dto.request.GroupVoteRequest;
import org.example.calenj.group.groupvote.dto.response.GroupVoteResponse;
import org.example.calenj.group.groupvote.service.GroupVoteService;
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
        groupService.makeVote(groupVoteRequest);
    }

    @PostMapping("api/voteList")
    public List<GroupVoteResponse> noticeList(@RequestBody GroupVoteRequest groupVoteRequest) {
        return groupService.groupVoteList(groupVoteRequest.getGroupId());
    }

    @PostMapping("/api/voteDetail")
    public GroupVoteResponse voteDetail(@RequestParam(name = "voteId") UUID voteId) {
        groupService.voteViewCount(voteId);
        return groupService.voteDetail(voteId);
    }

    @PostMapping("/api/updateVote")
    public void updateVote(@RequestBody GroupVoteRequest groupVoteRequest) {
        groupService.updateVote(groupVoteRequest.getVoteId(), groupVoteRequest.getMyVote());
    }

    @PostMapping("/api/updateVoteEndDate")
    public void voteEndDateUpdate(@RequestBody GroupVoteRequest groupVoteRequest) {
        groupService.updateVoteEndDate(groupVoteRequest.getVoteId(), groupVoteRequest.getVoteEndDate());
    }
}
