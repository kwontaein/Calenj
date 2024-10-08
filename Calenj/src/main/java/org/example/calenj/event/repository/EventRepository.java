package org.example.calenj.event.repository;

import org.example.calenj.event.domain.Ids.EventId;
import org.example.calenj.event.domain.EventEntity;
import org.example.calenj.event.dto.response.EventResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EventRepository extends JpaRepository<EventEntity, EventId> {

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query("UPDATE Events e SET e.eventStatus =:isAccept WHERE e.ownUserId.userId =:requestUserId and e.eventName=:eventType")
    void updateEvent(@Param("requestUserId") UUID requestUserId, @Param("isAccept") EventEntity.statusType isAccept, @Param("eventType") EventEntity.eventType type);

    //모든 이벤트 리스트
    @Query("SELECT new org.example.calenj.event.dto.response.EventResponse" +
            "(e.eventId,e.ownUserId.nickname,e.ownUserId.userId,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate,e.eventContent) FROM Events e WHERE e.ownUserId.userId =:userId")
    Optional<List<EventResponse>> EventListById(@Param("userId") UUID userId);

    //요청한 친구 추가 이벤트
    @Query("SELECT new org.example.calenj.event.dto.response.EventResponse(e.eventId,e.eventUserNickName,e.ownUserId.userId,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate,e.eventContent) FROM Events e WHERE e.ownUserId.userId =:userId and e.eventName=RequestFriend and e.eventStatus=WAITING")
    Optional<List<EventResponse>> RequestEventListById(@Param("userId") UUID userId);

    //요청받은 친구 추가 이벤트
    @Query("SELECT new org.example.calenj.event.dto.response.EventResponse(e.eventId,e.ownUserId.nickname,e.ownUserId.userId,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate,e.eventContent) FROM Events e WHERE e.eventUserId =:userId and e.eventName=RequestFriend and e.eventStatus=WAITING")
    Optional<List<EventResponse>> ResponseEventListById(@Param("userId") UUID userId);

    @Query("SELECT new org.example.calenj.event.dto.response.EventResponse(e.eventId,e.ownUserId.nickname,e.ownUserId.userId,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate,e.eventContent) FROM Events e WHERE e.ownUserId.userId =:ownUserId and e.eventUserId =:friendId and e.eventName=RequestFriend and e.eventStatus =WAITING")
    Optional<List<EventResponse>> isDuplicatedEvent(@Param("ownUserId") UUID ownUserId, @Param("friendId") UUID friendId);

    default boolean checkIfDuplicatedEvent(UUID ownUserId, UUID friendId) {
        Optional<List<EventResponse>> duplicatedEvents = isDuplicatedEvent(ownUserId, friendId);
        return duplicatedEvents.isPresent() && !duplicatedEvents.get().isEmpty();
    }

    @Query("SELECT e.eventContent FROM Events e WHERE e.ownUserId.userId =:userId and e.eventUserId =:myUserId and e.eventName=RequestFriend  and e.eventStatus=WAITING")
    Optional<String> findEventContentByIds(@Param("myUserId") UUID myUserId, @Param("userId") UUID userId);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "DELETE from Events e where e.ownUserId.userId =:userId")
    void deleteByUserId(@Param("userId") UUID userId);
}
