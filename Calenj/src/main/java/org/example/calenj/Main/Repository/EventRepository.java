package org.example.calenj.Main.Repository;

import org.example.calenj.Main.DTO.EventDTO;
import org.example.calenj.Main.domain.EventEntity;
import org.example.calenj.Main.domain.Ids.EventId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<EventEntity, EventId> {
    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE Events SET eventStatus =:isAccept WHERE ownUserId = :requestUserId", nativeQuery = true)
    void updateEventFriendRequest(@Param("requestUserId") String requestUserId, @Param("isAccept") String isAccept);

    //모든 이벤트 리스트
    @Query("SELECT new org.example.calenj.Main.DTO.EventDTO(e.eventId,e.ownUserId.userEmail,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate) FROM Events e WHERE e.ownUserId.userEmail =:userId")
    Optional<List<EventDTO>> EventListById(@Param("userId") String userId);

    //요청한 친구 추가 이벤트
    @Query("SELECT new org.example.calenj.Main.DTO.EventDTO(e.eventId,e.ownUserId.userEmail,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate) FROM Events e WHERE e.ownUserId.userEmail =:userId and e.eventName=RequestFriend")
    Optional<List<EventDTO>> RequestEventListById(@Param("userId") String userId);

    //요청받은 친구 추가 이벤트
    @Query("SELECT new org.example.calenj.Main.DTO.EventDTO(e.eventId,e.ownUserId.userEmail,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate) FROM Events e WHERE e.eventUserId =:userId and e.eventName=RequestFriend")
    Optional<List<EventDTO>> ResponseEventListById(@Param("userId") String userId);

    @Query("SELECT new org.example.calenj.Main.DTO.EventDTO(e.eventId,e.ownUserId.userEmail,e.eventUserId,e.eventPurpose,e.eventName,e.eventStatus,e.createDate) FROM Events e WHERE e.ownUserId.userEmail =:ownUserId and e.eventUserId =:friendId and e.eventName=:RequestFriend")
    Optional<List<EventDTO>> isDuplicatedEvent(@Param("ownUserId") String ownUserId, @Param("friendId") String friendId);

    default boolean checkIfDuplicatedEvent(String ownUserId, String friendId) {
        Optional<List<EventDTO>> duplicatedEvents = isDuplicatedEvent(ownUserId, friendId);
        return duplicatedEvents.isPresent() && !duplicatedEvents.get().isEmpty();
    }

}
