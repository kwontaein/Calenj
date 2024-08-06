package org.example.calenj.group.groupschedule.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.calendar.dto.request.ExtendedPropsRequest;
import org.example.calenj.calendar.dto.request.RepeatStateRequest;
import org.example.calenj.calendar.dto.request.ScheduleRequest;
import org.example.calenj.calendar.service.CalendarService;
import org.example.calenj.event.domain.EventEntity;
import org.example.calenj.event.service.EventService;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.group.groupinfo.repository.GroupRepository;
import org.example.calenj.group.groupschedule.domain.GroupScheduleEntity;
import org.example.calenj.group.groupschedule.dto.request.GroupScheduleRequest;
import org.example.calenj.group.groupschedule.dto.request.GroupSubScheduleRequest;
import org.example.calenj.group.groupschedule.dto.response.GroupScheduleResponse;
import org.example.calenj.group.groupschedule.dto.response.GroupSubScheduleResponse;
import org.example.calenj.group.groupschedule.repository.Group_ScheduleRepository;
import org.example.calenj.group.groupschedule.repository.Group_Sub_Schedule_Repository;
import org.example.calenj.user.domain.UserEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupScheduleService {
    private final Group_ScheduleRepository groupScheduleRepository;
    private final Group_Sub_Schedule_Repository groupSubScheduleRepository;
    private final GroupRepository groupRepository;

    private final GlobalService globalService;
    private final EventService eventService;
    private final CalendarService calendarService;

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    /**
     * 그룹 일정 생성
     *
     * @param groupScheduleRequest 그룹 일정 정보
     */
    public void createGroupSchedule(GroupScheduleRequest groupScheduleRequest) {
        GroupEntity group = groupRepository.findByGroupId(groupScheduleRequest.getGroupId()).orElse(null);

        LocalDateTime dateTime = LocalDateTime.now();

        String userName = globalService.extractFromSecurityContext().getUsername();

        //매니저에 나 추가
        List<String> name = new ArrayList<>();
        name.add(userName);

        groupScheduleRequest.setManagers(name);
        groupScheduleRequest.setScheduleId(UUID.randomUUID());

        //참여 유저 받아서 내이름 추가 후 저장
        List<String> user;

        if (groupScheduleRequest.getMember() == null) {
            user = new ArrayList<>();
        } else {
            user = groupScheduleRequest.getMember();
        }
        user.add(userName);
        groupScheduleRequest.setMember(user);

        GroupScheduleEntity groupScheduleEntity = groupScheduleRequest.toEntity(group, Timestamp.valueOf(dateTime));
        groupScheduleRepository.save(groupScheduleEntity);
    }

    /**
     * 그룹 서브 일정 생성 및 업데이트
     *
     * @param groupScheduleRequest
     */
    public void updateSubSchedule(GroupScheduleRequest groupScheduleRequest) {
        GroupEntity group = groupRepository.findByGroupId(groupScheduleRequest.getGroupId()).orElse(null);
        groupScheduleRepository.save(groupScheduleRequest.toEntity(group, null));
        GroupScheduleEntity groupScheduleEntity = groupScheduleRepository.findById(groupScheduleRequest.getScheduleId()).orElse(null);
        System.out.println("groupScheduleRequest : " + groupScheduleRequest);
        for (GroupSubScheduleRequest subSchedule : groupScheduleRequest.getGroupSubSchedules()) {
            groupSubScheduleRepository.save(subSchedule.toEntity(groupScheduleEntity));
        }
        addCalendar(groupScheduleEntity);
    }

    /**
     * 그룹 일정 삭제
     *
     * @param scheduleId 삭제할 일정 아이디
     */
    public void deleteSchedule(UUID scheduleId) {
        //서브 전부 지우고
        groupSubScheduleRepository.deleteByScheduleId(scheduleId);
        //일정 삭제
        groupScheduleRepository.deleteById(scheduleId);
    }

    /**
     * 그룹 서브 일정 삭제
     *
     * @param subScheduleId 삭제할 일정 아이디
     */
    public void deleteSubSchedule(UUID subScheduleId) {
        groupSubScheduleRepository.deleteById(subScheduleId);
    }

    /**
     * 그룹 일정 조회
     *
     * @param groupId
     * @return
     */
    public List<GroupScheduleResponse> getGroupScheduleList(UUID groupId) {
        return groupScheduleRepository.findByGroupId(groupId).orElse(null);
    }

    /**
     * 그룹 서브 일정 조회
     *
     * @param scheduleId
     * @return
     */
    public List<GroupSubScheduleResponse> getSubScheduleList(UUID scheduleId) {
        System.out.println("scheduleId : " + scheduleId);
        return groupSubScheduleRepository.findByScheduleId(scheduleId).orElse(null);
    }

    /**
     * 스케쥴에 참여 요청하기 + 호스트에게 알림 보내기
     */
    public void joinSchedule(UUID scheduleId) {
        GroupScheduleEntity groupScheduleEntity = groupScheduleRepository.findById(scheduleId).orElse(null);
        if (groupScheduleEntity == null) {
            return;
        }
        UserEntity host = groupScheduleEntity.getManager();
        UserEntity myEntity = globalService.getUserEntity(null);
        eventService.createEvent("이벤트 요청입니다", myEntity, host, "Join Schedule");
        template.convertAndSend("/topic/personalTopic/" + groupScheduleEntity.getManager().getUserId(), "일정 참가 요청");
    }

    /**
     *
     */
    public void joinResponse(UUID scheduleId, UUID friendUserId, boolean isAccept) {
        GroupScheduleEntity groupScheduleEntity = groupScheduleRepository.findById(scheduleId).orElse(null);
        if (groupScheduleEntity == null) {
            return;
        }
        eventService.updateEventState(friendUserId, isAccept ? EventEntity.statusType.ACCEPT : EventEntity.statusType.REJECT, EventEntity.eventType.JoinSchedule);

        String member = groupScheduleEntity.getMember();
        List<String> memberList = GroupScheduleResponse.convertStringToArray(member);
        memberList.add(friendUserId.toString());
        member = memberList.toString();

        groupScheduleRepository.updateMember(scheduleId, member);
        template.convertAndSend("/topic/personalTopic/" + friendUserId, "일정에 참여되었습니다.");
    }

    /**
     * 캘린더에 그룹 스케쥴 추가하기
     *
     * @param groupScheduleEntity
     */
    public void addCalendar(GroupScheduleEntity groupScheduleEntity) {
        // 시간정보 얻기
        Timestamp start = groupScheduleEntity.getScheduleStart();
        // 서브목록 가져오기
        List<GroupSubScheduleResponse> responses = getSubScheduleList(groupScheduleEntity.getScheduleId());
        // 태그
        List<String> tagKey = extractTagKey();
        int plusTime = 0;

        for (GroupSubScheduleResponse response : responses) {
            //내이름 포함 x -> 스킵
            if (!response.getJoinUser().contains(globalService.extractFromSecurityContext().getUsername())) {
                continue;
            }
            // 새로운 Timestamp 객체 생성
            Timestamp newStart = new Timestamp(start.getTime() + (plusTime * 3600000L));
            // ScheduleRequest 객체 생성 및 저장
            calendarService.saveSchedule(createScheduleRequest(response, newStart, tagKey));
            plusTime += response.getSubScheduleDuration();
        }
    }

    /**
     * 태그 정보 추출하기
     *
     * @return
     */
    private List<String> extractTagKey() {
        return calendarService.getTagEntityList().stream()
                .filter(tag -> "group".equals(tag.getName()))
                .map(tag -> tag.getId().toString())
                .findFirst()
                .map(Collections::singletonList)
                .orElse(Collections.emptyList());
    }

    /**
     * 스케쥴 dto 생성하기
     *
     * @param response
     * @param newStart
     * @param tagKey
     * @return
     */
    private ScheduleRequest createScheduleRequest(GroupSubScheduleResponse response, Timestamp newStart, List<String> tagKey) {
        RepeatStateRequest repeatStateRequest = new RepeatStateRequest(
                response.getSubScheduleId(), null, null, false, 1, null, null, null, null, 1, null, null);

        ExtendedPropsRequest extendedPropsRequest = new ExtendedPropsRequest(
                tagKey, "schedule", response.getSubScheduleContent(), null, null, repeatStateRequest);

        Timestamp newEnd = new Timestamp(newStart.getTime() + (response.getSubScheduleDuration() * 3600000L));

        return new ScheduleRequest(
                response.getSubScheduleId(), response.getSubScheduleTitle(), newStart, null, newEnd, false, extendedPropsRequest);
    }
}
