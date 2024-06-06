package org.example.calenj.calendar.repository;

import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.calendar.dto.response.ScheduleResponse;
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
public interface UserScheduleRepository extends JpaRepository<UserScheduleEntity, UUID> {
    @Query("SELECT new org.example.calenj.calendar.dto.response.ScheduleResponse" +
            "(Us.scheduleId,Us.scheduleStartDateTime,Us.scheduleEndDateTime,Us.scheduleRepeat,Us.scheduleRepeatPeriod,Us.scheduleRepeatDelay,Us.userScheduleTitle,Us.userScheduleContent)" +
            " FROM User_Schedule Us WHERE Us.userId.userId = :userId")
    Optional<List<ScheduleResponse>> findListByUserId(@Param("userId") UUID userId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE User_Schedule SET" +
            " scheduleStartDateTime = startDateTime,scheduleEndDateTime=endDateTime,scheduleRepeat=scheduleRepeat,scheduleRepeatPeriod=scheduleRepeatPeriod" +
            ",scheduleRepeatDelay=scheduleRepeatDelay,userScheduleTitle=userScheduleTitle,userScheduleContent=userScheduleContent WHERE userId = :userId", nativeQuery = true)
    Optional<UserScheduleEntity> updateScheduleById(@Param("userId") UUID userId);
}
