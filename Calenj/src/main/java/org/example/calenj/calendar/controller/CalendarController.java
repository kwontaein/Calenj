package org.example.calenj.calendar.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalendarController {
    /**
     * 개인 스케쥴 저장
     **/
    public ResponseEntity<String> saveUserSchedule() {
        return ResponseEntity.ok("스케쥴 저장 성공");
    }

    /**
     * 개인 스케쥴 조회
     **/
    public ResponseEntity<String> selectUserSchedule() {
        return ResponseEntity.ok("스케쥴 저장 성공");
    }

    /**
     * 개인 스케쥴 업데이트
     **/
    public ResponseEntity<String> updateUserSchedule() {
        return ResponseEntity.ok("스케쥴 저장 성공");
    }

    /**
     * 개인 스케쥴 삭제
     **/
    public ResponseEntity<String> deleteUserSchedule() {
        return ResponseEntity.ok("스케쥴 저장 성공");
    }

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
