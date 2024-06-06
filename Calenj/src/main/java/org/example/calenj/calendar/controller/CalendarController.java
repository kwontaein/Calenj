package org.example.calenj.calendar.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.calendar.dto.request.ScheduleRequest;
import org.example.calenj.calendar.dto.request.StampRequest;
import org.example.calenj.calendar.dto.response.StampResponse;
import org.example.calenj.calendar.service.CalendarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    /**
     * 개인 스케쥴 저장
     * DTO 로 받아옴
     **/
    @PostMapping("api/saveUserSchedule")
    public ResponseEntity<String> saveUserSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        calendarService.saveSchedule(scheduleRequest);
        return ResponseEntity.ok("스케쥴 저장 성공");
    }

    /**
     * 개인 스케쥴 조회
     **/
    @GetMapping("api/getUserSchedule")
    public void selectUserSchedule() {
        calendarService.getScheduleList();
    }

    /**
     * 개인 스케쥴 업데이트
     **/
    @PutMapping("api/updateUserSchedule")
    public void updateUserSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        calendarService.updateSchedule(scheduleRequest);
    }

    /**
     * 개인 스케쥴 삭제
     **/
    @PostMapping("api/deleteUserSchedule")
    public void deleteUserSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        calendarService.deleteSchedule(scheduleRequest.getScheduleId());
    }

    /**
     * 스탬프 추가
     * DTO 로 받아옴
     **/
    @PostMapping("api/saveStamp")
    public void saveStamp(@RequestBody StampRequest stampRequest) {
        //스탬프 DB에 저장
        calendarService.saveStamp(stampRequest);
    }

    /**
     * 스탬프 종류 반환
     * DTO 로 받아옴
     **/
    @PostMapping("api/getStamp")
    public List<StampResponse> getStamp() {
        //유저 이름으로 저장된 스탬프 조회
        return calendarService.getStampList();
    }

    //------------------------------------------------------

    /**
     * 그룹 스케쥴 저장
     **/
    public ResponseEntity<String> saveGroupSchedule() {
        return ResponseEntity.ok("스케쥴 저장 성공");
    }

    /**
     * 그룹 스케쥴 조회
     **/
    public ResponseEntity<String> selectGroupSchedule() {
        return ResponseEntity.ok("스케쥴 저장 성공");
    }

    /**
     * 그룹 스케쥴 업데이트
     **/
    public ResponseEntity<String> updateGroupSchedule() {
        return ResponseEntity.ok("스케쥴 저장 성공");
    }

    /**
     * 그룹 스케쥴 삭제
     **/
    public ResponseEntity<String> deleteGroupSchedule() {
        return ResponseEntity.ok("스케쥴 저장 성공");
    }
}
