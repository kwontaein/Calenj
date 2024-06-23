package org.example.calenj.calendar.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.calendar.domain.Ids.TagId;
import org.example.calenj.calendar.domain.Ids.UserScheduleEntityId;
import org.example.calenj.calendar.domain.TagEntity;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.calendar.dto.request.ScheduleRequest;
import org.example.calenj.calendar.dto.request.StampRequest;
import org.example.calenj.calendar.dto.request.TagRequest;
import org.example.calenj.calendar.dto.response.*;
import org.example.calenj.calendar.repository.RepeatStateRepository;
import org.example.calenj.calendar.repository.StampRepository;
import org.example.calenj.calendar.repository.TagRepository;
import org.example.calenj.calendar.repository.UserScheduleRepository;
import org.example.calenj.global.service.GlobalService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final GlobalService globalService;

    private final StampRepository stampRepository;
    private final UserScheduleRepository userScheduleRepository;
    private final TagRepository tagRepository;
    private final RepeatStateRepository repeatStateRepository;


    public void saveStamp(StampRequest stampRequest) {
        stampRepository.save(stampRequest.toEntity(globalService.myUserEntity()));
    }

    public List<StampResponse> getStampList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        return stampRepository.findByUserID(UUID.fromString(userDetails.getUsername())).orElse(null);
    }

    @Transactional
    public void updateSchedule(ScheduleRequest scheduleRequest) {
        UserScheduleEntity userSchedule = userScheduleRepository
                .findById(new UserScheduleEntityId(scheduleRequest.getId(), globalService.myUserEntity())).orElseThrow(() -> new RuntimeException("오류"));
        //변경 감지를 통한 자동 업데이트
        //userSchedule.updateScheduleDetails(scheduleRequest);
    }

    public void deleteSchedule(UUID scheduleID) {
        userScheduleRepository.deleteById(new UserScheduleEntityId(scheduleID, globalService.myUserEntity()));
    }

    public void saveSchedule(ScheduleRequest scheduleRequest) {
        UserScheduleEntity userScheduleEntity = scheduleRequest.toEntity(globalService.myUserEntity());
        System.out.println(scheduleRequest.getExtendedProps().getRepeatState());
        repeatStateRepository.save(scheduleRequest.getExtendedProps().getRepeatState().toEntity(userScheduleRepository.save(userScheduleEntity)));
    }

    public List<ScheduleResponse> getScheduleList() {

        //schedule
        List<ScheduleResponse> scheduleResponses = userScheduleRepository.findListByUserId(globalService.myUserEntity().getUserId()).orElse(null);

        if (scheduleResponses.isEmpty()) {
            return scheduleResponses; // 조기 반환을 통해 불필요한 연산 방지
        }

        List<UUID> ids = scheduleResponses.stream().map(ScheduleResponse::getId).collect(Collectors.toList());
        //repeatState
        List<RepeatStateResponse> repeatStateResponses = repeatStateRepository.findAllByIds(ids);

        Map<UUID, RepeatStateResponse> repeatStateMap = repeatStateResponses.stream()
                .collect(Collectors.toMap(RepeatStateResponse::getScheduleId, Function.identity()));

        // ScheduleResponses 각각에 대해 RepeatStateResponse 매칭 및 설정
        scheduleResponses.forEach(schedule -> {
            RepeatStateResponse repeatState = repeatStateMap.get(schedule.getId());
            if (repeatState != null) {
                ExtendedPropsResponse extendedProps = schedule.getExtendedProps();
                extendedProps.setRepeatState(repeatState); // RepeatStateResponse 설정
            }
        });
        System.out.println("scheduleResponses : \n" + scheduleResponses);
        return scheduleResponses;
    }

    public List<TagResponse> getTagEntityList() {
        return tagRepository.findByUserId(globalService.myUserEntity().getUserId()).orElseThrow(() -> new RuntimeException("오류 발생!"));
    }

    public TagResponse saveTag(TagRequest tagRequest) {
        TagEntity tag = tagRepository.save(tagRequest.toEntity(globalService.myUserEntity()));
        TagResponse tagResponse = new TagResponse(tag.getTagId(), tag.getTag(), tag.getTagColor(), tag.isDefaultTag());
        return tagResponse;
    }

    public void deleteTag(UUID id) {
        tagRepository.deleteById(new TagId(id, globalService.myUserEntity()));
    }
}

