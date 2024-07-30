package org.example.calenj.group.groupschedule.service;

import lombok.RequiredArgsConstructor;
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
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupScheduleService {
    private final Group_ScheduleRepository groupScheduleRepository;
    private final Group_Sub_Schedule_Repository groupSubScheduleRepository;
    private final GroupRepository groupRepository;
    private final GlobalService globalService;

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
        GroupScheduleEntity groupScheduleEntity = groupScheduleRepository.findById(groupScheduleRequest.getScheduleId()).orElse(null);

        for (GroupSubScheduleRequest subSchedule : groupScheduleRequest.getGroupSubSchedules()) {
            groupSubScheduleRepository.save(subSchedule.toEntity(groupScheduleEntity));
        }
    }

    /**
     * 그룹 일정 삭제
     *
     * @param scheduleId 삭제할 일정 아이디
     */
    public void deleteSchedule(UUID scheduleId) {
        //서브 전부 지우고
        groupSubScheduleRepository.deleteByscheduleId(scheduleId);
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
        return groupSubScheduleRepository.findByScheduleId(scheduleId).orElse(null);
    }

}
