package org.example.calenj.Main.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Chat.AlarmResponse;
import org.example.calenj.Main.DTO.Chat.ChatMessageResponse;
import org.example.calenj.Main.Service.WebSoket.WebSokcetService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final WebSokcetService webSokcetService;


    //그룹 채팅
    @MessageMapping("/groupMsg")
    public void groupMsg(Authentication authentication, ChatMessageResponse message) throws Exception {
        String username = webSokcetService.returnNickname(authentication);
        message.setMessage(username + " : " + message.getMessage());
        System.out.println(message.getMessage());
        System.out.println("/topic/groupMsg/" + message.getGroupMsg());
        template.convertAndSend("/topic/groupMsg/" + message.getGroupMsg(), message);
    }

    //알림을 위한 개인 구독 (온라인 전환도 할 예정)
    @MessageMapping("/personalTopic")
    public void personalTopic(AlarmResponse alarmResponse) throws Exception {
        System.out.println("alarmDTO : " + alarmResponse);
        String userId = webSokcetService.returnUserId(alarmResponse.getUserId());
        System.out.println("/topic/personalTopic/" + userId);
        template.convertAndSend("/topic/personalTopic/" + userId, alarmResponse);
    }

    //친구에게 알림 보내기
    @MessageMapping("/friendMsg")
    public void friendMsg(Authentication authentication, ChatMessageResponse message) throws Exception {
        String username = webSokcetService.returnNickname(authentication);
        message.setMessage(username + message.getMessage());
        System.out.println(message.getMessage());
        template.convertAndSend("/topic/friendMsg/" + message.getFriendMsg(), message);
    }

}
