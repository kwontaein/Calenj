package org.example.calenj.calendar.repository;

import org.example.calenj.calendar.domain.RepeatStateEntity;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.calendar.dto.response.RepeatStateResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RepeatStateRepository extends JpaRepository<RepeatStateEntity, UserScheduleEntity> {

    @Query("SELECT new org.example.calenj.calendar.dto.response.RepeatStateResponse" +
            "(Rs.scheduleId.scheduleId,Rs.startTime,Rs.endTime,Rs.repeat,Rs.repeatOption,Rs.repeatMode,Rs.repeatDeadline,Rs.repeatEnd,Rs.repeatCount,Rs.repeatWeek)" +
            " FROM Schedule_Repeat_State Rs WHERE Rs.scheduleId.scheduleId in :Ids")
    List<RepeatStateResponse> findAllByIds(@Param("Ids") List<UUID> Ids);
}
