package org.example.calenj.Main.controller;

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
    private final GroupVoteService groupVoteService;

    @PostMapping("/api/makeVote")
    public void makeVote(@RequestBody GroupVoteDTO request) {
        System.out.println(request);
        groupVoteService.makeVote(request);
    }

    @PostMapping("api/voteList")
    public List<GroupVoteDTO> noticeList(@RequestBody GroupVoteDTO request) {
        return groupVoteService.groupVoteList(request.getGroupId());
    }

    @PostMapping("/api/voteDetail")
    public GroupVoteDTO voteDetail(@RequestParam(name = "voteId") UUID voteId) {
        groupVoteService.voteViewCount(voteId);
        return groupVoteService.voteDetail(voteId);
    }

    @PostMapping("/api/voteUpdate")
    public void voteUpdate(@RequestBody GroupVoteDTO request) {
        groupVoteService.updateVote(request.getVoteId(), request.getMyVote());
    }

    @PostMapping("/api/voteEndDateUpdate")
    public void voteEndDateUpdate(@RequestBody GroupVoteDTO request) {
        groupVoteService.voteEndDateUpdate(request.getVoteId(), request.getVoteEndDate());
    }

}
