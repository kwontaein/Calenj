package org.example.calenj.calendar.repository;

import org.example.calenj.calendar.domain.RepeatStateEntity;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.calendar.dto.response.RepeatStateResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface RepeatStateRepository extends JpaRepository<RepeatStateEntity, UserScheduleEntity> {
    @Query("SELECT new org.example.calenj.calendar.dto.response.RepeatStateResponse" +
            "(Rs.repeat)" +
            " FROM Schedule_Repeat_State Rs WHERE Rs.scheduleId.scheduleId in :Ids")
    List<RepeatStateResponse> findAllByIds(@Param("Ids") Collection<String> Ids);
}
