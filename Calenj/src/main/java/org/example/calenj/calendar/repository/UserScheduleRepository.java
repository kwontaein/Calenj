package org.example.calenj.calendar.repository;

import org.example.calenj.calendar.domain.Ids.UserScheduleEntityId;
import org.example.calenj.calendar.domain.UserScheduleEntity;
import org.example.calenj.calendar.dto.response.ScheduleResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserScheduleRepository extends JpaRepository<UserScheduleEntity, UserScheduleEntityId> {
    @Query("SELECT new org.example.calenj.calendar.dto.response.ScheduleResponse" +
            "(Us.scheduleId,Us.userScheduleTitle,Us.scheduleStartDateTime,Us.scheduleEndDateTime,Us.userScheduleAllDay" +
            ",Us.tagIds,Us.userScheduleFormState,Us.userScheduleContent,Us.userScheduleTodoList,Us.userScheduleFriendList)" +
            " FROM User_Schedule Us WHERE Us.userId.userId = :userId")
    Optional<List<ScheduleResponse>> findListByUserId(@Param("userId") UUID userId);

    @Query("select Us from User_Schedule Us where Us.scheduleId=:id")
    Optional<UserScheduleEntity> getSchedule(@Param("id") UUID id);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE User_Schedule Us set Us.scheduleStartDateTime =:start ,Us.scheduleEndDateTime =:end where Us.scheduleId=:id")
    void updateDate(@Param("id") UUID id, @Param("start") Timestamp start, @Param("end") Timestamp end);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query("delete from User_Schedule Us where Us.scheduleId =:scheduleID")
    void deleteByScheduleId(@Param("scheduleID") UUID scheduleID);
}
