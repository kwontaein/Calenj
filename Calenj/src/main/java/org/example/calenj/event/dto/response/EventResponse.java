package org.example.calenj.event.dto.response;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.event.domain.EventEntity;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventResponse {

    private UUID eventId;

    // 이벤트 요청받은 사람 닉네임
    private String receivedUserName;

    private String nickName;
    // 이벤트 발생자
    private UUID ownUserId;
    // 이벤트 요청받은 사람의 아이디
    private UUID receivedUserId;
    // 이벤트 목적
    private String eventPurpose;
    // 이벤트 이름
    private EventEntity.eventType eventName;
    //이벤트 상태
    private EventEntity.statusType eventStatus;
    //이벤트 생성일
    private String createDate;
    //이벤트 내용(소개글)
    private String eventContent;

    public EventResponse(UUID eventId, String nickName, UUID ownUserId, UUID receivedUserId, String eventPurpose, EventEntity.eventType eventName, EventEntity.statusType eventStatus, String createDate, String eventContent) {
        this.eventId = eventId;
        this.nickName = nickName;
        this.ownUserId = ownUserId;
        this.receivedUserId = receivedUserId;
        this.eventPurpose = eventPurpose;
        this.eventName = eventName;
        this.eventStatus = eventStatus;
        this.createDate = createDate;
        this.eventContent = eventContent;
    }
}
