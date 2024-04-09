package org.example.calenj.Main.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Group.GroupVoteDTO;
import org.example.calenj.Main.DTO.Group.VoteChoiceDTO;
import org.example.calenj.Main.Repository.Group.*;
import org.example.calenj.Main.Repository.UserRepository;
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

    private final UserRepository userRepository;
    private final GlobalService globalService;
    private final GroupRepository groupRepository;
    private final Group_UserRepository group_userRepository;

    private final Group_VoteRepository groupVoteRepository;
    private final VoteChoiceRepository voteChoiceRepository;
    private final InviteCodeRepository inviteCodeRepository;

    public void makeVote(GroupVoteDTO groupVoteDTO) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드

        GroupEntity groupEntity = groupRepository.findByGroupId(groupVoteDTO.getGroupId()).orElseThrow(() -> new UsernameNotFoundException("해당하는 그룹을 찾을수 없습니다"));
        List<String> viewerList = new ArrayList<>();
        //TODO :제거해야함
        viewerList.add("dysj11@naver.com");

        GroupVoteEntity groupVoteEntity = GroupVoteEntity.GroupVoteBuilder()
                .voteCreater(userDetails.getUsername())
                .voteTitle(groupVoteDTO.getVoteTitle())
                .voteCreated(groupVoteDTO.getVoteCreated())
                .voteEndDate(groupVoteDTO.getVoteEndDate())
                .isMultiple(groupVoteDTO.getIsMultiple())
                .anonymous(groupVoteDTO.getAnonymous())
                .voteWatcher(viewerList)
                .group(groupEntity)
                .build();

        groupVoteRepository.save(groupVoteEntity);
        UUID voteId = groupVoteEntity.getVoteId();

        GroupVoteEntity groupVoteEntity2 = groupVoteRepository.findGroupVoteEntityByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표를 찾을 수 없습니다."));
        int i = 0;
        for (String items : groupVoteDTO.getPostedVoteChoiceDTO()) {
            voteChoiceRepository.save(VoteChoiceEntity
                    .builder()
                    .vote(groupVoteEntity2)
                    .voteItem(items)
                    .voteIndex(i)
                    .build());
            i++;
        }
    }


    public List<GroupVoteDTO> groupVoteList(UUID groupId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        List<GroupVoteDTO> groupVoteDTOS = groupVoteRepository.findVoteByGroupId(groupId).orElseThrow(() -> new RuntimeException("투표를 찾을 수 없습니다."));
        return groupVoteDTOS;
    }


    public GroupVoteDTO voteDetail(UUID voteId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        GroupVoteDTO groupVoteDTO = groupVoteRepository.findByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표가 존재하지 않습니다."));
        List<VoteChoiceDTO> voteChoiceDTO = voteChoiceRepository.findVoteItemByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표항목을 찾을 수 없습니다."));

        if (groupVoteDTO.getAnonymous()) {//익명투표일 경우 블라인드처리
            groupVoteDTO.setCountVoter(groupVoteDTO.getBlindedCounter(groupVoteDTO.getCountVoter(), userDetails.getUsername()));

            for (VoteChoiceDTO choiceDTO : voteChoiceDTO) {
                choiceDTO.setVoter(choiceDTO.getBlindedVoter(choiceDTO.getVoter(), userDetails.getUsername()));
            }
        }

        groupVoteDTO.setVoteChoiceDTO(voteChoiceDTO);
        return groupVoteDTO;
    }

    //그룹 투표 조회한 사람
    public void voteViewCount(UUID voteId) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        Optional<GroupVoteDTO> groupVoteDTO = groupVoteRepository.findByVoteId(voteId);

        //조회한 사람 갱신
        if (groupVoteDTO.isPresent() && groupVoteDTO.get().getVoteWatcher() != null) {
            List<String> Viewerlist = new ArrayList<>(groupVoteDTO.get().getVoteWatcher());

            Viewerlist.add(userDetails.getUsername());
            Set<String> ViewerDuplicates = new LinkedHashSet<>(Viewerlist); //중복제거

            List<String> ViewerDuplicateList = new ArrayList<>(ViewerDuplicates); //다시 list형식으로 변환

            // JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String json = objectMapper.writeValueAsString(ViewerDuplicateList);

                System.out.println("ViewerDuplicateList as JSON :" + json);

                groupVoteRepository.updateVoteWatcher(json, voteId);
            } catch (JsonProcessingException e) {
                e.getMessage();
            }
        }
    }

    public void updateVote(UUID voteId, boolean[] myVote) {
        UserDetails userDetails = globalService.extractFromSecurityContext(); // SecurityContext에서 유저 정보 추출하는 메소드
        List<VoteChoiceDTO> voteChoiceDTO = voteChoiceRepository.findVoteItemByVoteId(voteId).orElseThrow(() -> new RuntimeException("투표항목을 찾을 수 없습니다."));
        Set<String> uniqueVoters = new LinkedHashSet<>();//몇명이 투표했는지 확인하기 위한 Set

        voteChoiceDTO.sort((o1, o2) -> o1.getVoteIndex() - o2.getVoteIndex());
        ;
        System.out.println(voteChoiceDTO);
        int i = 0; //voter의 index값을 위한 선언
        for (VoteChoiceDTO voters : voteChoiceDTO) {
            int includeUser = voters.getVoter().indexOf(userDetails.getUsername());
            if (myVote[i] && includeUser == -1) { //기존 항목의 투표자중 내가 없으면서 투표를 했으면 내 이름 추가
                voters.getVoter().add(userDetails.getUsername());
            } else if (!myVote[i] && includeUser >= 0) { //기존 항목의 투표자들중 내가 존재했지만 재투표에 내가 취소를 하면
                voters.getVoter().remove(userDetails.getUsername());
            }

            List<String> ViewerDuplicateList = new ArrayList<>(voters.getVoter()); //다시 list형식으로 변환

            // JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String json = objectMapper.writeValueAsString(ViewerDuplicateList);

                System.out.println("ViewerDuplicateList as JSON :" + json);

                voteChoiceRepository.updateVoterList(voters.getChoiceId(), json);
            } catch (JsonProcessingException e) {
                e.getMessage();
            }

            i++;
        }
        //투표 갱신 이후 투표자 명단 갱신
        for (VoteChoiceDTO voters : voteChoiceDTO) {
            for (String voter : voters.getVoter()) {
                uniqueVoters.add(voter.trim());
            }
        }
        List<String> VoterCount = new ArrayList<>(uniqueVoters);
        // JSON 문자열로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(VoterCount);

            System.out.println("ViewerDuplicateList as JSON :" + json);

            groupVoteRepository.updateVoteCount(voteId, json);
        } catch (JsonProcessingException e) {
            e.getMessage();
        }
        //투표자 갱신


    }

    public void voteEndDateUpdate(UUID voteId, String voteEndDate) {
        groupVoteRepository.updatevoteEndDate(voteId, voteEndDate);
    }


}
