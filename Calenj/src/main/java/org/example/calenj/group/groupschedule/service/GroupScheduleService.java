package org.example.calenj.group.groupschedule.service;

import lombok.RequiredArgsConstructor;
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

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupScheduleService {
    private final Group_ScheduleRepository groupScheduleRepository;
    private final Group_Sub_Schedule_Repository groupSubScheduleRepository;
    private final GroupRepository groupRepository;

    /**
     * 그룹 일정 생성
     *
     * @param groupScheduleRequest 그룹 일정 정보
     */
    public void createGroupSchedule(GroupScheduleRequest groupScheduleRequest) {
        GroupEntity group = groupRepository.findByGroupId(groupScheduleRequest.getSchedule_Group()).orElse(null);
        groupScheduleRepository.save(groupScheduleRequest.toEntity(group));
    }

    /**
     * 그룹 서브 일정 생성 및 업데이트
     *
     * @param groupScheduleRequest
     */
    public void updateSubSchedule(GroupScheduleRequest groupScheduleRequest) {
        GroupScheduleEntity groupScheduleEntity = groupScheduleRepository.findById(groupScheduleRequest.getGroupScheduleId()).orElse(null);

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
