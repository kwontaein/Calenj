package org.example.calenj.event.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.event.domain.EventEntity;
import org.example.calenj.event.dto.response.EventResponse;
import org.example.calenj.event.repository.EventRepository;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.user.domain.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final GlobalService globalService;

    /**
     * 받은 친구 요청 목록
     */
    public List<EventResponse> ResponseFriendList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        return eventRepository.ResponseEventListById(UUID.fromString(userDetails.getUsername())).orElse(null);
    }

    /**
     * 보낸 친구 요청 목록
     */
    public List<EventResponse> RequestFriendList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        return eventRepository.RequestEventListById(UUID.fromString(userDetails.getUsername())).orElse(null);
    }

    /**
     * 친구 요청 소개글 조회
     *
     * @param myUserId 내아이디
     * @param userId   정보를 받아올 유저 아이디
     */
    public String getEventContent(String myUserId, UUID userId) {
        return eventRepository.findEventContentByIds(UUID.fromString(myUserId), userId).orElse("");
    }

    /**
     * 이벤트 생성
     *
     * @param eventContent 이벤트 내용
     * @param ownUser      요청자
     * @param friendUser   요청 대상
     * @param witchRequest 이벤트 종류
     */
    public void createEvent(String eventContent, UserEntity ownUser, UserEntity friendUser, String witchRequest) {
        EventEntity.eventType type = switch (witchRequest) {
            case "Friend Request" -> EventEntity.eventType.RequestFriend;
            case "Invite Group" -> EventEntity.eventType.InviteGroup;
            case "Join Schedule" -> EventEntity.eventType.JoinSchedule;
            default -> EventEntity.eventType.Else;
        };

        EventEntity eventEntity = EventEntity
                .builder()
                .eventContent(eventContent)
                .eventUserNickName(friendUser.getNickname())
                .ownUserId(globalService.getUserEntity(null))
                .eventUserId(friendUser.getUserId())
                .eventPurpose(witchRequest)
                .eventName(type)
                .eventStatus(EventEntity.statusType.WAITING)
                .createDate(String.valueOf(LocalDate.now()))
                .build();
        eventRepository.save(eventEntity);
    }

    /**
     * 이벤트 업데이트
     *
     * @param friendUserId 업데이트 유저 아이디
     * @param statusType   업데이트 상태
     * @param eventType    업데이트 이벤트 종류
     */
    public void updateEventState(UUID friendUserId, EventEntity.statusType statusType, EventEntity.eventType eventType) {
        eventRepository.updateEvent(friendUserId, statusType, eventType);
    }

    public boolean checkIfDuplicatedEvent(UUID userId, UUID friendUserId) {
        return eventRepository.checkIfDuplicatedEvent(userId, friendUserId);
    }
}
