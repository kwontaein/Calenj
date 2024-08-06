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
            "gss.subScheduleId" +
            ",gss.subScheduleTitle" +
            ",gss.subScheduleCreate" +
            ",gss.subScheduleDuration" +
            ",gss.subScheduleContent" +
            ",gss.index" +
            ",gss.joinUser" +
            ",gss.subScheduleLocate) " +
            "from group_sub_schedule gss " +
            "where gss.scheduleId.scheduleId =:scheduleId " +
            "order by gss.index asc")
    Optional<List<GroupSubScheduleResponse>> findByScheduleId(@Param("scheduleId") UUID scheduleId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("delete from group_sub_schedule gss where gss.scheduleId.scheduleId =: scheduleId")
    void deleteByScheduleId(@Param("scheduleId") UUID scheduleId);
}
