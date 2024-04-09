package org.example.calenj.Main.DTO.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.Main.domain.EventEntity;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {


    private UUID eventId;
    // 이벤트 발생자
    private String ownUserId;
    // 이벤트 요청받은 사람
    private String eventUserId;
    // 이벤트 목적
    private String eventPurpose;
    // 이벤트 이름
    private EventEntity.eventType eventName;
    //이벤트 상태
    private EventEntity.statusType eventStatus;
    //이벤트 생성일
    private String createDate;


}
