package org.example.calenj.calendar.repository;

import org.example.calenj.calendar.domain.Ids.RepeatStateId;
import org.example.calenj.calendar.domain.RepeatStateEntity;
import org.example.calenj.calendar.dto.response.RepeatStateResponse;
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
public interface RepeatStateRepository extends JpaRepository<RepeatStateEntity, RepeatStateId> {

    @Query("SELECT new org.example.calenj.calendar.dto.response.RepeatStateResponse" +
            "(Rs.scheduleId.scheduleId,Rs.startTime,Rs.endTime,Rs.repeatNum,Rs.repeat,Rs.repeatOption,Rs.repeatMode,Rs.repeatDeadline,Rs.repeatEnd,Rs.repeatCount,Rs.repeatWeek,Rs.noRepeatDates)" +
            " FROM Schedule_Repeat_State Rs WHERE Rs.scheduleId.scheduleId in :Ids")
    List<RepeatStateResponse> findAllByIds(@Param("Ids") List<UUID> Ids);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Schedule_Repeat_State Rs set Rs.noRepeatDates =:exDates where Rs.scheduleId.scheduleId =:id ")
    void addExDate(@Param("exDates") String exDates, @Param("id") UUID id);

    @Query("SELECT Rs.noRepeatDates from Schedule_Repeat_State Rs where Rs.scheduleId.scheduleId =:id")
    Optional<String> findByScheduleId(@Param("id") UUID id);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("delete from Schedule_Repeat_State Rs where Rs.scheduleId.scheduleId =:scheduleId")
    void deleteByScheduleId(@Param("scheduleId") UUID scheduleID);
}
