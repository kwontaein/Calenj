package org.example.calenj.calendar.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.calendar.domain.Ids.TagId;
import org.example.calenj.calendar.domain.Ids.UserScheduleEntityId;
import org.example.calenj.calendar.domain.TagEntity;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.calendar.dto.request.ScheduleRequest;
import org.example.calenj.calendar.dto.request.TagRequest;
import org.example.calenj.calendar.dto.response.ExtendedPropsResponse;
import org.example.calenj.calendar.dto.response.RepeatStateResponse;
import org.example.calenj.calendar.dto.response.ScheduleResponse;
import org.example.calenj.calendar.dto.response.TagResponse;
import org.example.calenj.calendar.repository.RepeatStateRepository;
import org.example.calenj.calendar.repository.TagRepository;
import org.example.calenj.calendar.repository.UserScheduleRepository;
import org.example.calenj.global.service.GlobalService;
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

    private final UserScheduleRepository userScheduleRepository;
    private final TagRepository tagRepository;
    private final RepeatStateRepository repeatStateRepository;

    /**
     * 스케쥴 업데이트
     *
     * @param scheduleRequest 업데이트할 스케쥴 정보
     */
    @Transactional
    public void updateSchedule(ScheduleRequest scheduleRequest) {
        UserScheduleEntity userSchedule = userScheduleRepository
                .findById(new UserScheduleEntityId(scheduleRequest.getId(), globalService.myUserEntity())).orElseThrow(() -> new RuntimeException("오류"));
        //변경 감지를 통한 자동 업데이트
        //userSchedule.updateScheduleDetails(scheduleRequest);
    }

    /**
     * 스케쥴 삭제
     *
     * @param scheduleID 삭제할 스케쥴 아이디
     */
    public void deleteSchedule(UUID scheduleID) {
        userScheduleRepository.deleteById(new UserScheduleEntityId(scheduleID, globalService.myUserEntity()));
    }

    /**
     * 스케쥴 추가
     *
     * @param scheduleRequest 추가할 스케쥴 정보
     */
    public void saveSchedule(ScheduleRequest scheduleRequest) {
        UserScheduleEntity userScheduleEntity = scheduleRequest.toEntity(globalService.myUserEntity());
        System.out.println(scheduleRequest.getExtendedProps().getRepeatState());
        repeatStateRepository.save(scheduleRequest.getExtendedProps().getRepeatState().toEntity(userScheduleRepository.save(userScheduleEntity)));
    }

    /**
     * 스케쥴 목록 조회
     *
     * @return 스케쥴 목록 반환
     */
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

    /**
     * 스케쥴 태그 목록 조회
     *
     * @return 스케쥴 태그 목록
     */
    public List<TagResponse> getTagEntityList() {
        return tagRepository.findByUserId(globalService.myUserEntity().getUserId()).orElseThrow(() -> new RuntimeException("오류 발생!"));
    }

    /**
     * 태그 저장
     *
     * @param tagRequest 저장할 태그 정보
     * @return 저장된 태그 반환
     */
    public TagResponse saveTag(TagRequest tagRequest) {
        TagEntity tag = tagRepository.save(tagRequest.toEntity(globalService.myUserEntity()));
        TagResponse tagResponse = new TagResponse(tag.getTagId(), tag.getTag(), tag.getTagColor(), tag.isDefaultTag());
        return tagResponse;
    }

    /**
     * 태그 삭제
     *
     * @param id 삭제할 태그 아이디
     */
    public void deleteTag(UUID id) {
        tagRepository.deleteById(new TagId(id, globalService.myUserEntity()));
    }
}

