package org.example.calenj.calendar.service;

import lombok.RequiredArgsConstructor;
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
        UserScheduleEntity userSchedule = userScheduleRepository.findById(scheduleRequest.getScheduleId()).orElseThrow(() -> new RuntimeException("오류"));
        //변경 감지를 통한 자동 업데이트
        //userSchedule.updateScheduleDetails(scheduleRequest);
    }

    public void deleteSchedule(UUID scheduleID) {
        userScheduleRepository.deleteById(scheduleID);
    }

    public void saveSchedule(ScheduleRequest scheduleRequest) {
        userScheduleRepository.save(scheduleRequest.toEntity(globalService.myUserEntity(), getTagEntity(scheduleRequest.getTagId())));
        repeatStateRepository.save(scheduleRequest.getExtendedProps().getRepeatState().toEntity());
    }

    public List<CombinedResponse> getScheduleList() {

        //schedule
        List<ScheduleResponse> scheduleResponses = userScheduleRepository.findListByUserId(globalService.myUserEntity().getUserId()).orElse(null);
        //extended
        List<ExtendedPropsResponse> extendedPropsResponses = userScheduleRepository.findExtendedByUserId(globalService.myUserEntity().getUserId()).orElse(null);

        List<String> ids = scheduleResponses.stream().map(ScheduleResponse::getId).collect(Collectors.toList());
        //repeatState
        List<RepeatStateResponse> repeatStateResponses = repeatStateRepository.findAllByIds(ids);

        return combineList(scheduleResponses, extendedPropsResponses, repeatStateResponses);
    }

    public List<CombinedResponse> combineList(List<ScheduleResponse> scheduleResponses, List<ExtendedPropsResponse> extendedPropsResponses, List<RepeatStateResponse> repeatStateResponses) {
        // ScheduleResponse 리스트에서 Map 생성 (id 기준)
        Map<String, ScheduleResponse> scheduleMap = scheduleResponses.stream()
                .collect(Collectors.toMap(ScheduleResponse::getId, Function.identity()));

        // ExtendedPropsResponse 리스트에서 Map 생성 (scheduleId 기준)
        Map<UUID, ExtendedPropsResponse> extendedPropsMap = extendedPropsResponses.stream()
                .collect(Collectors.toMap(ExtendedPropsResponse::getScheduleId, Function.identity()));

        // RepeatStateResponse 리스트를 반복하여 새로운 복합 객체 생성
        List<CombinedResponse> combinedResponses = repeatStateResponses.stream()
                .map(repeatState -> {
                    String scheduleId = String.valueOf(repeatState.getScheduleId().getScheduleId());  // UserScheduleEntity에서 ID를 가져옴
                    ScheduleResponse schedule = scheduleMap.get(scheduleId);
                    ExtendedPropsResponse extendedProps = extendedPropsMap.get(schedule.getScheduleId());

                    return new CombinedResponse(schedule, extendedProps, repeatState); // 새로운 CombinedResponse 생성
                })
                .collect(Collectors.toList());
        System.out.println(combinedResponses);
        return combinedResponses;
    }


    public void saveTagEntity(TagRequest tagRequest) {
        tagRepository.save(tagRequest.toEntity(globalService.myUserEntity()));
    }

    public TagEntity getTagEntity(UUID tagId) {
        TagEntity tagEntity = tagRepository.findById(tagId).orElseThrow(() -> new RuntimeException("일치하는 태그가 없습니다."));
        return tagEntity;
    }

    public List<TagResponse> getTagEntityList() {
        return tagRepository.findByUserId(globalService.myUserEntity().getUserId()).orElseThrow(() -> new RuntimeException("오류 발생!"));
    }

}

