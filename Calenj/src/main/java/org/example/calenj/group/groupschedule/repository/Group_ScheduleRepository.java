package org.example.calenj.group.groupschedule.repository;

import org.example.calenj.group.groupschedule.domain.GroupScheduleEntity;
import org.example.calenj.group.groupschedule.dto.response.GroupScheduleResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface Group_ScheduleRepository extends JpaRepository<GroupScheduleEntity, UUID> {
    @Query("select new org.example.calenj.group.groupschedule.dto.response.GroupScheduleResponse(" +
            "Gs.scheduleId" +
            ",Gs.scheduleTitle" +
            ",Gs.scheduleCreate" +
            ",Gs.scheduleStart" +
            ",Gs.managers" +
            ",Gs.privacy" +
            ",Gs.maxPeople," +
            "Gs.member)" +
            " from group_schedule Gs where Gs.schedule_Group.groupId =:groupId")
    Optional<List<GroupScheduleResponse>> findByGroupId(@Param("groupId") UUID groupId);
}
