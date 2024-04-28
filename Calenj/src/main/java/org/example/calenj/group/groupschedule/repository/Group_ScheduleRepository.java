package org.example.calenj.group.groupschedule.repository;

import org.example.calenj.group.groupschedule.domain.ids.GroupScheduleId;
import org.example.calenj.group.groupschedule.dto.response.GroupScheduleResponse;
import org.example.calenj.group.groupschedule.domain.GroupScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface Group_ScheduleRepository extends JpaRepository<GroupScheduleEntity, GroupScheduleId> {
    // 다섯 번째 쿼리: GroupScheduleEntity 조회
    @Query("SELECT new org.example.calenj.group.groupschedule.dto.response.GroupScheduleResponse(gs.groupScheduleTitle, gs.groupScheduleContent, gs.groupScheduleLocation, gs.groupScheduleId) FROM Group_Schedule gs WHERE gs.groupUser.group.groupId = :groupId")
    List<GroupScheduleResponse> findGroupSchedule(@Param("groupId") UUID groupId);
}
