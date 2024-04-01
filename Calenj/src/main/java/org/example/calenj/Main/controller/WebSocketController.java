package org.example.calenj.Main.controller;

import org.example.calenj.Main.DTO.Chat.AlarmDTO;
import org.example.calenj.Main.DTO.Chat.ChatMessageDTO;
import org.example.calenj.Main.DTO.Chat.OnlineDTO;
import org.example.calenj.Main.model.WebSoket.WebSokcetService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final WebSokcetService webSokcetService;

    public WebSocketController(SimpMessagingTemplate template, WebSokcetService webSokcetService) {
        this.template = template;
        this.webSokcetService = webSokcetService;
    }

    //그룹원 온라인 리스트 (그룹)
    @MessageMapping("/online")
    public void online(OnlineDTO isOnline) throws Exception {
        Map<String, String> isOnlineStatus = webSokcetService.offlineList(isOnline, isOnline.getGroupId());
        isOnline.setOnlineStatusMap(isOnlineStatus);

        System.out.println("온/오프라인 유저 리스트 : " + isOnline.getOnlineStatusMap());
        template.convertAndSend("/topic/userOnline/" + isOnline.getGroupId(), isOnline.getOnlineStatusMap());
    }

    //그룹 채팅 참여
    @MessageMapping("/chat/enter")
    public void enter(Authentication authentication, ChatMessageDTO message) throws Exception {
        String username = webSokcetService.returnNickname(authentication);
        message.setMessage(username + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/topic/chat/room/" + message.getGroupId(), message);
    }

    //그룹 채팅 참여
    @MessageMapping("/chat/message")
    public void message(ChatMessageDTO message) throws Exception {
        template.convertAndSend("/topic/chat/room/" + message.getGroupId(), message);
    }

    //알림을 위한 개인 구독 (온라인 전환도 할 예정)
    @MessageMapping("/personalTopic")
    public void personalTopic(AlarmDTO alarmDTO) throws Exception {
        String username = webSokcetService.returnUserId(alarmDTO.getUserName());
        //db에 값 업데이트
        boolean isOnOff = webSokcetService.OnOff(username);
        template.convertAndSend("/topic/personalTopic/" + username, alarmDTO.getAlarmContent());
    }

}
