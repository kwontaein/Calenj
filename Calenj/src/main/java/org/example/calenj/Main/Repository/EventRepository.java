package org.example.calenj.Main.Repository;

import org.example.calenj.Main.DTO.EventDTO;
import org.example.calenj.Main.domain.EventEntity;
import org.example.calenj.Main.domain.Ids.EventId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<EventEntity, EventId> {
    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE Events SET eventStatus =:isAccept WHERE ownUserId = :requestUserId", nativeQuery = true)
    void updateEventFriendRequest(String requestUserId, String isAccept);

    @Query("SELECT new org.example.calenj.Main.DTO.EventDTO(e.eventId,e.ownUserId,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate) FROM Events e WHERE e.ownUserId.userEmail =:userId")
    Optional<List<EventDTO>> EventListById(String userId);

    @Query("SELECT new org.example.calenj.Main.DTO.EventDTO(e.eventId,e.ownUserId,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate) FROM Events e WHERE e.ownUserId.userEmail =:userId and e.eventName=:RequestFriend")
    Optional<List<EventDTO>> RequestEventListById(String userId);

    @Query("SELECT new org.example.calenj.Main.DTO.EventDTO(e.eventId,e.ownUserId,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate) FROM Events e WHERE e.eventUserId =:userId and e.eventName=:RequestFriend")
    Optional<List<EventDTO>> ResponseEventListById(String userId);
}