package org.example.calenj.calendar.repository;

import org.example.calenj.calendar.domain.Ids.UserScheduleEntityId;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.calendar.dto.response.ExtendedPropsResponse;
import org.example.calenj.calendar.dto.response.ScheduleResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserScheduleRepository extends JpaRepository<UserScheduleEntity, UserScheduleEntityId> {
    @Query("SELECT new org.example.calenj.calendar.dto.response.ScheduleResponse" +
            "(Us.scheduleId,Us.personalId,Us.userScheduleTitle,Us.scheduleStartDateTime,Us.scheduleEndDateTime,Us.userScheduleAllDay" +
            ",Us.tagId,Us.userScheduleFormState,Us.userScheduleContent,Us.userScheduleTodoList)" +
            " FROM User_Schedule Us WHERE Us.userId.userId = :userId")
    Optional<List<ScheduleResponse>> findListByUserId(@Param("userId") UUID userId);


    @Query("SELECT new org.example.calenj.calendar.dto.response.ExtendedPropsResponse" +
            "(Us.scheduleId,Us.userScheduleFormState,Us.userScheduleContent,Us.userScheduleTodoList)" +
            " FROM User_Schedule Us WHERE Us.userId.userId = :userId")
    Optional<List<ExtendedPropsResponse>> findExtendedByUserId(@Param("userId") UUID userId);
}
