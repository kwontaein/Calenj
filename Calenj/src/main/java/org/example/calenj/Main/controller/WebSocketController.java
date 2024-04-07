package org.example.calenj.Main.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Chat.AlarmDTO;
import org.example.calenj.Main.DTO.Chat.ChatMessageDTO;
import org.example.calenj.Main.model.WebSoket.WebSokcetService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final WebSokcetService webSokcetService;


    /*@MessageMapping("/online")//그룹원 온라인 리스트 (그룹)
    public void online(OnlineDTO isOnline) throws Exception {
        Map<String, String> isOnlineStatus = webSokcetService.offlineList(isOnline, isOnline.getGroupId());
        isOnline.setOnlineStatusMap(isOnlineStatus);

        System.out.println("온/오프라인 유저 리스트 : " + isOnline.getOnlineStatusMap());
        template.convertAndSend("/topic/userOnline/" + isOnline.getGroupId(), isOnline.getOnlineStatusMap());
    }*/

    //그룹 채팅
    @MessageMapping("/groupMsg")
    public void groupMsg(Authentication authentication, ChatMessageDTO message) throws Exception {
        String username = webSokcetService.returnNickname(authentication);
        message.setMessage(username + message.getMessage());
        System.out.println(message.getMessage());
        template.convertAndSend("/topic/groupMsg/" + message.getGroupId(), message);
    }

    //알림을 위한 개인 구독 (온라인 전환도 할 예정)
    @MessageMapping("/personalTopic")
    public void personalTopic(AlarmDTO alarmDTO) throws Exception {
        String username = webSokcetService.returnUserId(alarmDTO.getUserName());
        //db에 값 업데이트
        if (alarmDTO.isStartEnd()) {
            webSokcetService.OnOff(username); //온라인 오프라인 전환
            alarmDTO.setStartEnd(false);
        }
        template.convertAndSend("/topic/personalTopic/" + username, alarmDTO.getAlarmContent());
    }

    //친구에게 알림 보내기
    @MessageMapping("/friendMsg")
    public void friendMsg(Authentication authentication, ChatMessageDTO message) throws Exception {
        String username = webSokcetService.returnNickname(authentication);
        message.setMessage(username + message.getMessage());
        System.out.println(message.getMessage());
        template.convertAndSend("/topic/friendMsg/" + message.getFriendId(), message);
    }

}
