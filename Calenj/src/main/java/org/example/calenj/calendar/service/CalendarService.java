package org.example.calenj.calendar.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.calenj.calendar.domain.Ids.TagId;
import org.example.calenj.calendar.domain.TagEntity;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.calendar.dto.request.ScheduleRequest;
import org.example.calenj.calendar.dto.request.ShareScheduleRequest;
import org.example.calenj.calendar.dto.request.SharedPositionRequest;
import org.example.calenj.calendar.dto.request.TagRequest;
import org.example.calenj.calendar.dto.response.RepeatStateResponse;
import org.example.calenj.calendar.dto.response.ScheduleResponse;
import org.example.calenj.calendar.dto.response.TagResponse;
import org.example.calenj.calendar.repository.RepeatStateRepository;
import org.example.calenj.calendar.repository.TagRepository;
import org.example.calenj.calendar.repository.UserScheduleRepository;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.group.groupinfo.dto.response.GroupResponse;
import org.example.calenj.group.groupinfo.service.GroupService;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.websocket.service.WebSocketService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final GlobalService globalService;
    private final WebSocketService webSocketService;
    private final GroupService groupService;

    private final UserScheduleRepository userScheduleRepository;
    private final TagRepository tagRepository;
    private final RepeatStateRepository repeatStateRepository;

    /**
     * 스케쥴 업데이트
     *
     * @param scheduleRequest 업데이트할 스케쥴 정보
     */
    public void updateSchedule(ScheduleRequest scheduleRequest) {
        // 반복일정일 경우 -> 수정된 날짜만 미포함 + 해당 날짜에 새로운 스케쥴 생성
        // 그냥 일정일 경우 -> 날짜만 변경
        //System.out.println("scheduleRequest : " + scheduleRequest);
        if (scheduleRequest.getExtendedProps().getRepeatState().isRepeat()) {
            updateRepeatSchedule(scheduleRequest);
        } else {
            userScheduleRepository.updateDate(scheduleRequest.getId(), scheduleRequest.getStart(), scheduleRequest.getEnd());
        }
    }

    /**
     * 반복 일정 수정
     *
     * @param scheduleRequest 업데이트할 스케쥴 정보
     */
    public void updateRepeatSchedule(ScheduleRequest scheduleRequest) {
        String exDates = repeatStateRepository.findByScheduleId(scheduleRequest.getId()).orElse(null);
        List<String> dates = RepeatStateResponse.convertStringToArray(exDates);

        dates.add(scheduleRequest.getOldStart().toString());
        repeatStateRepository.addExDate(dates.toString(), scheduleRequest.getId());

        UserScheduleEntity userScheduleEntity = userScheduleRepository.getSchedule(scheduleRequest.getId()).orElse(null);

        scheduleRequest.getExtendedProps().getRepeatState().setRepeat(false);
        scheduleRequest.getExtendedProps().getRepeatState().setRepeatCount(1);
        scheduleRequest.setId(null);

        if (scheduleRequest.getEnd() == null) {
            scheduleRequest.setEnd(scheduleRequest.getStart());
        }

        scheduleRequest.setTitle(userScheduleEntity != null ? userScheduleEntity.getUserScheduleTitle() : null);

        saveSchedule(scheduleRequest);
    }

    /**
     * 스케쥴 삭제
     *
     * @param scheduleID 삭제할 스케쥴 아이디
     */
    public void deleteSchedule(UUID scheduleID) {
        UUID myUserName = UUID.fromString(globalService.extractFromSecurityContext().getUsername());
        repeatStateRepository.deleteByScheduleId(scheduleID, myUserName);
        userScheduleRepository.deleteByScheduleId(scheduleID, myUserName);
    }


    /**
     * 스케쥴 추가
     *
     * @param scheduleRequest 추가할 스케쥴 정보
     */
    public void saveSchedule(ScheduleRequest scheduleRequest) {
        UserScheduleEntity checkEntity = userScheduleRepository.getSchedule(scheduleRequest.getId()).orElse(null);
        if (checkEntity != null) {
            //이미 있는 정보일 경우 수정
            //로직 수행
            UserScheduleEntity userScheduleEntity = scheduleRequest.toEntity(globalService.getUserEntity(null));
            userScheduleRepository.save(userScheduleEntity);
            return;
        }
        UserScheduleEntity userScheduleEntity = scheduleRequest.toEntity(globalService.getUserEntity(null));
        repeatStateRepository.save(scheduleRequest.getExtendedProps().getRepeatState().toEntity(userScheduleRepository.save(userScheduleEntity)));
    }

    /**
     * 그룹 스케쥴 추가
     *
     * @param scheduleRequest 추가할 그룹 스케쥴 정보
     */
    public void saveGroupSchedule(ScheduleRequest scheduleRequest, UserEntity user) {
        UserScheduleEntity checkEntity = userScheduleRepository.getSchedule(scheduleRequest.getId()).orElse(null);
        UserScheduleEntity userScheduleEntity = scheduleRequest.toEntity(user);
        if (checkEntity != null) {
            //이미 있는 정보일 경우 수정
            //로직 수행
            userScheduleRepository.save(userScheduleEntity);
            return;
        }
        repeatStateRepository.save(scheduleRequest.getExtendedProps().getRepeatState().toEntity(userScheduleRepository.save(userScheduleEntity)));
    }

    /**
     * 스케쥴 목록 조회
     *
     * @return 스케쥴 목록 반환
     */
    public List<ScheduleResponse> getScheduleList() {
        // 사용자 스케줄 목록 가져오기
        List<ScheduleResponse> userSchedules = userScheduleRepository
                .findListByUserId(globalService.getUserEntity(null).getUserId())
                .orElse(Collections.emptyList());  // null 대신 빈 리스트 반환

        // 내가 포함된 그룹 일정 조회 및 합치기
        userSchedules.addAll(groupSchedulesInMe());

        // 스케줄이 없으면 조기 반환
        if (userSchedules.isEmpty()) {
            return userSchedules;
        }

        // 중복 제거
        List<ScheduleResponse> distinctSchedules = userSchedules.stream()
                .distinct()
                .collect(Collectors.toList());

        // 스케줄 ID 추출
        List<UUID> scheduleIds = distinctSchedules.stream()
                .map(ScheduleResponse::getId)
                .collect(Collectors.toList());

        // 반복 정보 조회 및 매핑
        Map<UUID, RepeatStateResponse> repeatStateMap = repeatStateRepository.findAllByIds(scheduleIds).stream()
                .collect(Collectors.toMap(RepeatStateResponse::getScheduleId, Function.identity()));

        // 각 스케줄에 반복 정보 설정
        distinctSchedules.forEach(schedule -> {
            RepeatStateResponse repeatState = repeatStateMap.get(schedule.getId());
            if (repeatState != null) {
                schedule.getExtendedProps().setRepeatState(repeatState);
            }
        });

        return distinctSchedules;
    }

    /**
     * 내가 포함된 일정 조회
     */
    public List<ScheduleResponse> groupSchedulesInMe() {
        //그룹 일정중에 내가 포함된 그룹(서브) 일정을 조회해야 함
        List<ScheduleResponse> scheduleResponses = new ArrayList<>();
        UserEntity user = globalService.getUserEntity(null);
        //그룹 일정 전부 조회
        for (GroupResponse g : groupService.groupList()) {
            //내가 포함된 일정 뽑기
            List<UserScheduleEntity> scheduleEntities = userScheduleRepository.findGroupSchedule(g.getGroupId(), user.getUserId()).orElse(null);
            List<ScheduleResponse> scheduleResponseDTOs = scheduleEntities.stream()
                    .map(entity -> new ScheduleResponse(
                            entity.getScheduleId(),
                            entity.getUserScheduleTitle(),
                            entity.getScheduleStartDateTime(),
                            entity.getScheduleEndDateTime(),
                            entity.isUserScheduleAllDay(),
                            entity.getTagIds(),
                            entity.getUserScheduleFormState(),
                            entity.getUserScheduleContent(),
                            entity.getUserScheduleTodoList(),
                            entity.getUserScheduleFriendList()
                    ))
                    .collect(Collectors.toList());
            scheduleResponses.addAll(scheduleResponseDTOs);
        }
        return scheduleResponses;
    }

    /**
     * 스케쥴 태그 목록 조회
     *
     * @return 스케쥴 태그 목록
     */
    public List<TagResponse> getTagEntityList() {
        List<TagResponse> tagResponses = tagRepository.findByUserId(globalService.getUserEntity(null).getUserId()).orElseThrow(() -> new RuntimeException("오류 발생!"));
        List<GroupResponse> groupResponses = groupService.groupList();
        for (GroupResponse g : groupResponses) { //내가 속한 그룹의 태그 포함
            tagResponses.add(getGroupTag(g.getGroupId()));
        }
        return tagResponses;
    }


    /**
     * 그룹 스케쥴 태그 목록 조회
     *
     * @return 그룹 스케쥴 태그 목록
     */
    public TagResponse getGroupTag(UUID groupId) {
        return tagRepository.findTagByGroupId(groupId).orElse(null);
    }


    /**
     * 태그 저장
     *
     * @param tagRequest 저장할 태그 정보
     * @return 저장된 태그 반환
     */
    public TagResponse saveTag(TagRequest tagRequest) {
        TagEntity tag = tagRepository.save(tagRequest.toEntity(globalService.getUserEntity(null)));
        TagResponse tagResponse = new TagResponse(tag.getTagId(), tag.getTag(), tag.getTagColor(), tag.isDefaultTag());
        return tagResponse;
    }

    /**
     * 태그 삭제
     *
     * @param id 삭제할 태그 아이디
     */
    public void deleteTag(UUID id) {
        tagRepository.deleteById(new TagId(id, globalService.getUserEntity(null)));
    }

    /**
     * 일정 공유
     *
     * @param scheduleRequest
     */
    public void shareSchedule(ShareScheduleRequest scheduleRequest) {
        UUID userId = UUID.fromString(globalService.extractFromSecurityContext().getUsername());


        ScheduleResponse scheduleResponse = userScheduleRepository.findByScheduleId(scheduleRequest.getScheduleId()).orElse(null);
        RepeatStateResponse repeatStateresponse = repeatStateRepository.findOneByIds(scheduleResponse.getId()).orElse(null);

        if (repeatStateresponse.getNoRepeatDates() != null && repeatStateresponse.getNoRepeatDates().isEmpty()) {
            repeatStateresponse.setNoRepeatDates(null);
        }

        scheduleResponse.getExtendedProps().setRepeatState(repeatStateresponse);
        if (scheduleResponse.getExtendedProps().getTodoList().isEmpty()) {
            scheduleResponse.getExtendedProps().setTodoList(null);
        }
        if (scheduleResponse.getExtendedProps().getFriendList().isEmpty()) {
            scheduleResponse.getExtendedProps().setFriendList(null);
        }
        ObjectMapper mapper = new ObjectMapper();
        String jsonString;
        try {
            jsonString = mapper.writeValueAsString(scheduleResponse);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        for (SharedPositionRequest positionRequest : scheduleRequest.getSharedPositionRequests()) {
            webSocketService.groupEventChat(positionRequest.getChatId(), userId.toString(), "schedule", jsonString);
        }
    }


    public UUID updateSharedGroupSchedule(UUID subScheduleId) {
        // 1. 그룹 스케줄 목록을 조회
        UserScheduleEntity groupSchedules = userScheduleRepository.getGroupSchedules(subScheduleId).orElse(null);
        // 2. 조회된 스케줄이 있는지 확인 후 업데이트
        if (groupSchedules != null) {
            return groupSchedules.getScheduleId();
        } else {
            return null;
        }
    }

}

