package org.example.calenj.group.groupschedule.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.group.groupschedule.dto.request.GroupScheduleRequest;
import org.example.calenj.group.groupschedule.dto.request.GroupSubScheduleRequest;
import org.example.calenj.group.groupschedule.dto.response.GroupScheduleResponse;
import org.example.calenj.group.groupschedule.dto.response.GroupSubScheduleResponse;
import org.example.calenj.group.groupschedule.service.GroupScheduleService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GroupScheduleController {
    private final GroupScheduleService groupScheduleService;


    /**
     * 그룹 스케쥴 생성
     *
     * @param groupScheduleRequest
     */
    @PostMapping("api/createGroupSchedule")
    public void createGroupSchedule(@RequestBody GroupScheduleRequest groupScheduleRequest) {
        groupScheduleService.createGroupSchedule(groupScheduleRequest);
    }

    /**
     * 그룹 스케쥴 목록 조회
     *
     * @param groupScheduleRequest
     * @return
     */
    @PostMapping("api/getGroupScheduleList")
    public List<GroupScheduleResponse> getGroupScheduleList(@RequestBody GroupScheduleRequest groupScheduleRequest) {
        return groupScheduleService.getGroupScheduleList(groupScheduleRequest.getScheduleGroup());
    }

    /**
     * 그룹 스케쥴 삭제
     *
     * @param groupScheduleRequest
     */
    @PostMapping("api/deleteGroupSchedule")
    public void deleteGroupSchedue(@RequestBody GroupScheduleRequest groupScheduleRequest) {
        groupScheduleService.deleteSchedule(groupScheduleRequest.getGroupScheduleId());
    }

    /**
     * 서브 스케쥴 생성 및 업데이트
     *
     * @param groupScheduleRequest
     */
    @PostMapping("api/createSubSchedule")
    public void createSubSchedule(@RequestBody GroupScheduleRequest groupScheduleRequest) {
        groupScheduleService.updateSubSchedule(groupScheduleRequest);
    }

    /**
     * 서브 스케쥴 목록 조회
     *
     * @param groupSubScheduleRequest
     * @return
     */
    @PostMapping("api/getSubScheduleList")
    public List<GroupSubScheduleResponse> getGroupScheduleList(@RequestBody GroupSubScheduleRequest groupSubScheduleRequest) {
        return groupScheduleService.getSubScheduleList(groupSubScheduleRequest.getScheduleId());
    }

    /**
     * 서브 스케쥴 삭제
     *
     * @param groupSubScheduleRequest
     */
    @PostMapping("api/deleteSubSchedule")
    public void deleteSubSchedue(@RequestBody GroupSubScheduleRequest groupSubScheduleRequest) {
        groupScheduleService.deleteSubSchedule(groupSubScheduleRequest.getSubScheduleId());
    }
}
