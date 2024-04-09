package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.DTO.Group.GroupScheduleDTO;
import org.example.calenj.Main.domain.Group.GroupScheduleEntity;
import org.example.calenj.Main.domain.Ids.GroupScheduleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface Group_ScheduleRepository extends JpaRepository<GroupScheduleEntity, GroupScheduleId> {
    // 다섯 번째 쿼리: GroupScheduleEntity 조회
    @Query("SELECT new org.example.calenj.Main.DTO.Group.GroupScheduleDTO.Response(gs.groupScheduleTitle, gs.groupScheduleContent, gs.groupScheduleLocation, gs.groupScheduleId) FROM Group_Schedule gs WHERE gs.groupUser.group.groupId = :groupId")
    List<GroupScheduleDTO> findGroupSchedule(@Param("groupId") UUID groupId);
}
