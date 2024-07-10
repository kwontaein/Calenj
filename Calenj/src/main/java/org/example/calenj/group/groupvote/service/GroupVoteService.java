package org.example.calenj.group.groupvote.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.group.groupvote.dto.request.GroupVoteRequest;
import org.example.calenj.group.groupvote.dto.response.GroupVoteResponse;
import org.example.calenj.group.groupvote.dto.response.VoteChoiceResponse;
import org.example.calenj.group.groupinfo.repository.GroupRepository;
import org.example.calenj.group.groupvote.repository.Group_VoteRepository;
import org.example.calenj.group.groupvote.repository.VoteChoiceRepository;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.group.groupvote.domain.GroupVoteEntity;
import org.example.calenj.group.groupvote.domain.VoteChoiceEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GroupVoteService {

    private final GlobalService globalService;
    private final GroupRepository groupRepository;
    private final Group_VoteRepository groupVoteRepository;
    private final VoteChoiceRepository voteChoiceRepository;

    public void makeVote(GroupVoteRequest request) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        GroupEntity groupEntity = groupRepository.findByGroupId(request.getGroupId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));
        GroupVoteEntity groupVoteEntity = groupVoteRepository.save(request.toEntity(userDetails.getUsername(), groupEntity));
        
        int i = 0;
        for (String items : request.getPostedVoteChoiceDTO()) {
            voteChoiceRepository.save(VoteChoiceEntity
                    .builder()
                    .vote(groupVoteEntity)
                    .voteItem(items)
                    .voteIndex(i)
                    .build());
            i++;
        }
    }

    public List<GroupVoteResponse> groupVoteList(UUID groupId) {
        return groupVoteRepository.findVoteByGroupId(groupId).orElseThrow(() -> new RuntimeException("투표를 찾을 수 없습니다."));
    }

    public GroupVoteResponse voteDetail(UUID voteId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        GroupVoteResponse response = groupVoteRepository.findByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표가 존재하지 않습니다."));
        List<VoteChoiceResponse> voteChoiceResponse = voteChoiceRepository.findVoteItemByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표항목을 찾을 수 없습니다."));

        if (response.getAnonymous()) {//익명투표일 경우 블라인드처리
            response.setCountVoter(response.getBlindedCounter(response.getCountVoter(), userDetails.getUsername()));

            for (VoteChoiceResponse choiceDTO : voteChoiceResponse) {
                choiceDTO.setVoter(choiceDTO.getBlindedVoter(choiceDTO.getVoter(), userDetails.getUsername()));
            }
        }

        response.setVoteChoiceResponse(voteChoiceResponse);
        return response;
    }


    //그룹 투표 조회한 사람
    public void voteViewCount(UUID voteId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        Optional<GroupVoteResponse> groupVoteDTO = groupVoteRepository.findByVoteId(voteId);

        //조회한 사람 갱신
        if (groupVoteDTO.isPresent() && groupVoteDTO.get().getVoteWatcher() != null) {
            List<String> Viewerlist = new ArrayList<>(groupVoteDTO.get().getVoteWatcher());

            Viewerlist.add(userDetails.getUsername());
            Set<String> ViewerDuplicates = new LinkedHashSet<>(Viewerlist); //중복제거

            List<String> ViewerDuplicateList = new ArrayList<>(ViewerDuplicates); //다시 list형식으로 변환
            String json = globalService.saveArrayList(ViewerDuplicateList);
            groupVoteRepository.updateVoteWatcher(json, voteId);
        }
    }

    public void updateVote(UUID voteId, boolean[] myVote) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        List<VoteChoiceResponse> voteChoiceResponse = voteChoiceRepository.findVoteItemByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표항목을 찾을 수 없습니다."));
        Set<String> uniqueVoters = new LinkedHashSet<>();//몇명이 투표했는지 확인하기 위한 Set

        voteChoiceResponse.sort(Comparator.comparingInt(VoteChoiceResponse::getVoteIndex));
        System.out.println(voteChoiceResponse);

        int i = 0; //voter의 index값을 위한 선언
        for (VoteChoiceResponse voters : voteChoiceResponse) {
            int includeUser = voters.getVoter().indexOf(userDetails.getUsername());
            if (myVote[i] && includeUser == -1) { //기존 항목의 투표자중 내가 없으면서 투표를 했으면 내 이름 추가
                voters.getVoter().add(userDetails.getUsername());
            } else if (!myVote[i] && includeUser >= 0) { //기존 항목의 투표자들중 내가 존재했지만 재투표에 내가 취소를 하면
                voters.getVoter().remove(userDetails.getUsername());
            }

            List<String> ViewerDuplicateList = new ArrayList<>(voters.getVoter()); //다시 list형식으로 변환

            String json = globalService.saveArrayList(ViewerDuplicateList);
            voteChoiceRepository.updateVoterList(voters.getChoiceId(), json);
            i++;
        }

        //투표 갱신 이후 투표자 명단 갱신
        for (VoteChoiceResponse voters : voteChoiceResponse) {
            for (String voter : voters.getVoter()) {
                uniqueVoters.add(voter.trim());
            }
        }

        List<String> VoterCount = new ArrayList<>(uniqueVoters);

        String json = globalService.saveArrayList(VoterCount);
        groupVoteRepository.updateVoteCount(voteId, json);
    }

    public void voteEndDateUpdate(UUID voteId, String voteEndDate) {
        groupVoteRepository.updatevoteEndDate(voteId, voteEndDate);
    }

}
