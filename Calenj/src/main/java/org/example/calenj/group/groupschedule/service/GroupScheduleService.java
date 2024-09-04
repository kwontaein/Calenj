package org.example.calenj.group.groupschedule.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.calendar.dto.request.ExtendedPropsRequest;
import org.example.calenj.calendar.dto.request.RepeatStateRequest;
import org.example.calenj.calendar.dto.request.ScheduleRequest;
import org.example.calenj.calendar.dto.response.TagResponse;
import org.example.calenj.calendar.service.CalendarService;
import org.example.calenj.event.domain.EventEntity;
import org.example.calenj.event.service.EventService;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.group.groupinfo.domain.GroupEntity;
import org.example.calenj.group.groupinfo.repository.GroupRepository;
import org.example.calenj.group.groupschedule.domain.GroupScheduleEntity;
import org.example.calenj.group.groupschedule.domain.GroupSubScheduleEntity;
import org.example.calenj.group.groupschedule.dto.request.GroupScheduleRequest;
import org.example.calenj.group.groupschedule.dto.request.GroupSubScheduleRequest;
import org.example.calenj.group.groupschedule.dto.response.GroupScheduleResponse;
import org.example.calenj.group.groupschedule.dto.response.GroupSubScheduleResponse;
import org.example.calenj.group.groupschedule.repository.Group_ScheduleRepository;
import org.example.calenj.group.groupschedule.repository.Group_Sub_Schedule_Repository;
import org.example.calenj.naverApi.dto.response.NaverMapResponse;
import org.example.calenj.naverApi.service.NaverService;
import org.example.calenj.user.domain.UserEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupScheduleService {
    private final Group_ScheduleRepository groupScheduleRepository;
    private final Group_Sub_Schedule_Repository groupSubScheduleRepository;
    private final GroupRepository groupRepository;

    private final GlobalService globalService;
    private final EventService eventService;
    private final CalendarService calendarService;
    private final NaverService naverService;

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    /**
     * 그룹 일정 생성
     *
     * @param groupScheduleRequest 그룹 일정 정보
     */
    public void createGroupSchedule(GroupScheduleRequest groupScheduleRequest) {
        GroupEntity group = groupRepository.findByGroupId(groupScheduleRequest.getGroupId()).orElse(null);

        LocalDateTime dateTime = LocalDateTime.now();

        UserEntity user = globalService.getUserEntity(null);

        //매니저에 나 추가
        List<String> name = new ArrayList<>();
        name.add(user.getUserId().toString());

        groupScheduleRequest.setManager(user);
        groupScheduleRequest.setManagers(name);
        groupScheduleRequest.setScheduleId(UUID.randomUUID());

        //참여 유저 받아서 내이름 추가 후 저장
        List<String> users;

        if (groupScheduleRequest.getMember() == null) {
            users = new ArrayList<>();
        } else {
            users = groupScheduleRequest.getMember();
        }
        users.add(user.getUserId().toString());
        groupScheduleRequest.setMember(users);

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

        List<String> originId = groupSubScheduleRepository.findSubIds(groupScheduleRequest.getScheduleId());
        List<String> subIds = new ArrayList<>();
        List<UUID> updatedIds = new ArrayList<>();

        updateSubSchedules(groupScheduleRequest, groupScheduleEntity, subIds, updatedIds);
        deleteRemovedSubSchedules(originId, subIds);
        updateCalendarWithNewSchedules(groupScheduleEntity, updatedIds);
    }

    /**
     * 서브 일정 업데이트
     *
     * @param groupScheduleRequest
     * @param groupScheduleEntity
     * @param subIds
     * @param updatedIds
     */
    private void updateSubSchedules(GroupScheduleRequest groupScheduleRequest, GroupScheduleEntity groupScheduleEntity,
                                    List<String> subIds, List<UUID> updatedIds) {
        int lastIndex = groupScheduleRequest.getGroupSubSchedules().size() - 1;

        for (int i = 0; i < groupScheduleRequest.getGroupSubSchedules().size(); i++) {
            GroupSubScheduleRequest subSchedule = groupScheduleRequest.getGroupSubSchedules().get(i);

            if (subSchedule.getSubScheduleId() != null) {
                subIds.add(subSchedule.getSubScheduleId().toString());
            }

//            if (i < lastIndex) {
//                int duration = calculateDuration(subSchedule, groupScheduleRequest.getGroupSubSchedules().get(i + 1));
//                subSchedule.setDuration(duration + "분");
//            }

            groupSubScheduleRepository.save(subSchedule.toEntity(groupScheduleEntity));
            UUID updateId = calendarService.updateSharedGroupSchedule(subSchedule.getSubScheduleId());
            if (updateId != null) {
                updatedIds.add(updateId);
            }
        }
    }

    /**
     * 거리 계산
     *
     * @param current
     * @param next
     * @return
     */
    private int calculateDuration(GroupSubScheduleRequest current, GroupSubScheduleRequest next) {
        String locate1 = current.getPositionX() + "," + current.getPositionY();
        String locate2 = next.getPositionX() + "," + next.getPositionY();

        NaverMapResponse response = naverService.direction(locate1, locate2);
        return response.getRoute().getTrafast().get(0).getSummary().getDuration() / 60000;
    }

    /**
     * 삭제된 서브 일정 제거
     *
     * @param originIds
     * @param currentIds
     */
    private void deleteRemovedSubSchedules(List<String> originIds, List<String> currentIds) {
        for (String id : originIds) {
            if (!currentIds.contains(id)) {
                deleteSubSchedule(UUID.fromString(id));
            }
        }
    }

    /**
     * 스케쥴 업데이트가 필요한 경우 업데이트
     *
     * @param groupScheduleEntity
     * @param updatedIds
     */
    private void updateCalendarWithNewSchedules(GroupScheduleEntity groupScheduleEntity, List<UUID> updatedIds) {
        for (UUID id : updatedIds) {
            addCalendar(groupScheduleEntity, id);
        }
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
        List<GroupSubScheduleResponse> groupSubScheduleResponses = groupSubScheduleRepository.findByScheduleId(scheduleId).orElse(null);
        return groupSubScheduleResponses;
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

        List<String> memberList = groupScheduleEntity.getMember();
        memberList.add(friendUserId.toString());

        groupScheduleRepository.updateMember(scheduleId, memberList.toString());
        template.convertAndSend("/topic/personalTopic/" + friendUserId, "일정에 참여되었습니다.");
    }

    /**
     * 캘린더에 그룹 스케쥴 추가하기
     *
     * @param groupScheduleEntity
     */
    public void addCalendar(GroupScheduleEntity groupScheduleEntity, UUID subScheduleId) {
        // 시간정보 얻기
        Timestamp start = groupScheduleEntity.getScheduleStart();
        UUID groupId = groupScheduleEntity.getSchedule_Group().getGroupId();
        // 서브목록 가져오기
        List<GroupSubScheduleResponse> responses = getSubScheduleList(groupScheduleEntity.getScheduleId());

        //해당 그룹의 태그
        TagResponse tagKey = extractTagKey(groupScheduleEntity.getSchedule_Group().getGroupId());

        int plusTime = 0;
        System.out.println("groupScheduleEntity.getManager() :" + groupScheduleEntity.getManager());
        for (GroupSubScheduleResponse response : responses) {
            // 새로운 Timestamp 객체 생성
            Timestamp newStart = new Timestamp(start.getTime() + (plusTime * 1000 * 60L));
            //해당 아이디가 아닐 경우 skip
            if (!subScheduleId.equals(response.getSubScheduleId())) {
                plusTime += response.getSubScheduleDuration();
                continue;
            }
            // ScheduleRequest 객체 생성 및 저장
            calendarService.saveGroupSchedule(createScheduleRequest(response, newStart, tagKey, groupId), groupScheduleEntity.getManager());
            plusTime += response.getSubScheduleDuration();
        }
    }


    /**
     * 태그 정보 추출하기
     *
     * @return
     */
    private TagResponse extractTagKey(UUID groupId) {
        return calendarService.getGroupTag(groupId);
    }

    /**
     * 스케쥴 dto 생성하기
     *
     * @param response
     * @param newStart
     * @param tagKey
     * @return
     */
    private ScheduleRequest createScheduleRequest(GroupSubScheduleResponse response, Timestamp newStart, TagResponse tagKey, UUID groupId) {

        List<Boolean> repeatWeek = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            repeatWeek.add(false);
        }

        List<UUID> members = Optional.ofNullable(response.getJoinUser()).orElse(Collections.emptyList()).stream()
                .map(UUID::fromString)  // 각 String을 UUID로 변환
                .collect(Collectors.toList());  // 변환된 결과를 List로 수집

        UUID myUserId = UUID.fromString(globalService.extractFromSecurityContext().getUsername());

        if (members.contains(myUserId)) {
            members.remove(myUserId);
        } else {
            members.add(myUserId);
        }

        RepeatStateRequest repeatStateRequest =
                new RepeatStateRequest(
                        response.getSubScheduleId(),
                        null,
                        null,
                        false,
                        1,
                        null,
                        null,
                        null,
                        null,
                        1,
                        repeatWeek,
                        null);

        ExtendedPropsRequest extendedPropsRequest =
                new ExtendedPropsRequest(
                        Collections.singletonList(tagKey.getId()),
                        "promise",
                        response.getSubScheduleContent(),
                        new ArrayList<>(),
                        members,
                        repeatStateRequest);

        //System.out.println("newTime : " + response.getSubScheduleDuration());
        Timestamp newEnd = new Timestamp(newStart.getTime() + (response.getSubScheduleDuration() * 1000 * 60L));
        //System.out.println("newEnd : " + newEnd);
        return new ScheduleRequest(
                response.getSubScheduleId(),
                response.getSubScheduleTitle(),
                newStart,
                null,
                newEnd,
                false,
                true,
                groupId,
                extendedPropsRequest);
    }

    public String joinSubSchedule(UUID subScheduleId) {
        GroupSubScheduleEntity groupSubScheduleEntity = groupSubScheduleRepository.findById(subScheduleId).orElse(null);
        String myUserName = globalService.extractFromSecurityContext().getUsername();

        String response;

        List<String> members = groupSubScheduleEntity.getJoinUser();

        if (members.contains(myUserName)) {
            members.remove(myUserName);
            response = "해당 일정에 참여를 취소했습니다.";
        } else {
            members.add(myUserName);
            response = "해당 일정에 참여하였습니다.";
        }

        addCalendar(Objects.requireNonNull(groupScheduleRepository.findById(groupSubScheduleEntity.getScheduleId().getScheduleId()).orElse(null)), subScheduleId);
        //서브 일정에 유저 추가
        groupSubScheduleRepository.updateJoinUser(subScheduleId, members);

        return response;
    }
}
