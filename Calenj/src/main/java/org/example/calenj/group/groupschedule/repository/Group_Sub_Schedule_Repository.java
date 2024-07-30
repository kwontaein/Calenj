package org.example.calenj.group.groupschedule.repository;

import org.example.calenj.group.groupschedule.domain.GroupSubScheduleEntity;
import org.example.calenj.group.groupschedule.dto.response.GroupSubScheduleResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface Group_Sub_Schedule_Repository extends JpaRepository<GroupSubScheduleEntity, UUID> {
    @Query("select new org.example.calenj.group.groupschedule.dto.response.GroupSubScheduleResponse(" +
            "gss.groupSubScheduleId" +
            ",gss.scheduleTitle" +
            ",gss.scheduleCreate" +
            ",gss.scheduleDuration" +
            ",gss.scheduleContent" +
            ",gss.index" +
            ",gss.joinUser) " +
            "from group_sub_schedule gss " +
            "where gss.groupScheduleId.groupScheduleId =: scheduleId")
    Optional<List<GroupSubScheduleResponse>> findByScheduleId(UUID scheduleId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("delete from group_sub_schedule gss where gss.groupScheduleId.groupScheduleId =: scheduleId")
    void deleteByscheduleId(@Param("scheduleId") UUID scheduleId);
}