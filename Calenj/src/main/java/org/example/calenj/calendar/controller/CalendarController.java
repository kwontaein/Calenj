package org.example.calenj.calendar.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.calendar.dto.request.ScheduleRequest;
import org.example.calenj.calendar.dto.request.TagRequest;
import org.example.calenj.calendar.dto.response.ScheduleResponse;
import org.example.calenj.calendar.dto.response.TagResponse;
import org.example.calenj.calendar.service.CalendarService;
import org.example.calenj.naverApi.service.NaverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;
    private final NaverService naverService;

    /**
     * 개인 스케쥴 저장
     *
     * @param scheduleRequest 저장할 스케쥴 정보
     * @return 저장 성공여부
     */
    @PostMapping("api/saveUserSchedule")
    public ResponseEntity<String> saveUserSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        calendarService.saveSchedule(scheduleRequest);
        return ResponseEntity.ok("스케쥴 저장 성공");
    }

    /**
     * 개인 스케쥴 조회
     *
     * @return 스케쥴 목록
     */
    @GetMapping("api/getUserDateEvent")
    public List<ScheduleResponse> selectUserSchedule() {
        naverService.locationSearch("타임스퀘어");
        return calendarService.getScheduleList();
    }

    /**
     * 개인 스케쥴 업데이트
     *
     * @param scheduleRequest 수정할 스케쥴 정보
     */
    @PostMapping("api/updateUserSchedule")
    public void updateUserSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        calendarService.updateSchedule(scheduleRequest);
    }

    /**
     * 개인 스케쥴 삭제
     *
     * @param scheduleRequest 삭제할 스케쥴 정보
     */
    @PostMapping("api/deleteUserSchedule")
    public void deleteUserSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        calendarService.deleteSchedule(scheduleRequest.getId());
    }

    /**
     * 스케쥴 태그 조회
     *
     * @return 스케쥴 태그 목록
     */
    @GetMapping("api/getEventTag")
    public List<TagResponse> getTagList() {
        return calendarService.getTagEntityList();
    }


    /**
     * 스케쥴 태그 생성
     *
     * @param tagRequest 생성할 태그 정보
     * @return 저장된 태그 반환
     */
    @PostMapping("api/createTag")
    public TagResponse createTag(@RequestBody TagRequest tagRequest) {
        return calendarService.saveTag(tagRequest);
    }

    /**
     * 스케쥴 태그 삭제
     *
     * @param tagRequest 삭제할 태그 정보
     */
    @PostMapping("api/deleteTag")
    public void deleteTag(@RequestBody TagRequest tagRequest) {
        calendarService.deleteTag(tagRequest.getId());
    }

}
