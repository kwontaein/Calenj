package org.example.calenj.Main.Service.Group;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.GroupVoteDTO;
import org.example.calenj.Main.DTO.Group.VoteChoiceDTO;
import org.example.calenj.Main.Repository.Group.GroupRepository;
import org.example.calenj.Main.Repository.Group.Group_VoteRepository;
import org.example.calenj.Main.Repository.Group.VoteChoiceRepository;
import org.example.calenj.Main.Service.GlobalService;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.example.calenj.Main.domain.Group.GroupVoteEntity;
import org.example.calenj.Main.domain.Group.VoteChoiceEntity;
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

    public void makeVote(GroupVoteDTO.Request request) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드

        GroupEntity groupEntity = groupRepository.findByGroupId(request.getGroupId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));
        List<String> viewerList = new ArrayList<>();
        //TODO :제거해야함
        viewerList.add("dysj11@naver.com");

        GroupVoteEntity groupVoteEntity = GroupVoteEntity.GroupVoteBuilder()
                .voteCreater(userDetails.getUsername())
                .voteTitle(request.getVoteTitle())
                .voteCreated(request.getVoteCreated())
                .voteEndDate(request.getVoteEndDate())
                .isMultiple(request.getIsMultiple())
                .anonymous(request.getAnonymous())
                .voteWatcher(viewerList)
                .group(groupEntity)
                .build();

        groupVoteRepository.save(groupVoteEntity);

        GroupVoteEntity groupVoteEntity2 = groupVoteRepository.findGroupVoteEntityByVoteId(groupVoteEntity.getVoteId()).orElseThrow(() -> new RuntimeException("투표를 찾을 수 없습니다."));
        int i = 0;
        for (String items : request.getPostedVoteChoiceDTO()) {
            voteChoiceRepository.save(VoteChoiceEntity
                    .builder()
                    .vote(groupVoteEntity2)
                    .voteItem(items)
                    .voteIndex(i)
                    .build());
            i++;
        }
    }

    public List<GroupVoteDTO.Response> groupVoteList(UUID groupId) {
        return groupVoteRepository.findVoteByGroupId(groupId).orElseThrow(() -> new RuntimeException("투표를 찾을 수 없습니다."));
    }

    public GroupVoteDTO.Response voteDetail(UUID voteId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        GroupVoteDTO.Response response = groupVoteRepository.findByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표가 존재하지 않습니다."));
        List<VoteChoiceDTO.Response> voteChoiceDTO = voteChoiceRepository.findVoteItemByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표항목을 찾을 수 없습니다."));

        if (response.getAnonymous()) {//익명투표일 경우 블라인드처리
            response.setCountVoter(response.getBlindedCounter(response.getCountVoter(), userDetails.getUsername()));

            for (VoteChoiceDTO.Response choiceDTO : voteChoiceDTO) {
                choiceDTO.setVoter(choiceDTO.getBlindedVoter(choiceDTO.getVoter(), userDetails.getUsername()));
            }
        }

        response.setVoteChoiceDTO(voteChoiceDTO);
        return response;
    }


    //그룹 투표 조회한 사람
    public void voteViewCount(UUID voteId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        Optional<GroupVoteDTO.Response> groupVoteDTO = groupVoteRepository.findByVoteId(voteId);

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
        List<VoteChoiceDTO.Response> voteChoiceDTO = voteChoiceRepository.findVoteItemByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표항목을 찾을 수 없습니다."));
        Set<String> uniqueVoters = new LinkedHashSet<>();//몇명이 투표했는지 확인하기 위한 Set

        voteChoiceDTO.sort(Comparator.comparingInt(VoteChoiceDTO.Response::getVoteIndex));
        System.out.println(voteChoiceDTO);

        int i = 0; //voter의 index값을 위한 선언
        for (VoteChoiceDTO.Response voters : voteChoiceDTO) {
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
        for (VoteChoiceDTO.Response voters : voteChoiceDTO) {
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
