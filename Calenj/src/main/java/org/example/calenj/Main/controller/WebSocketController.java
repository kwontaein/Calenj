package org.example.calenj.Main.controller;

import org.example.calenj.Main.DTO.Chat.ChatMessageDTO;
import org.example.calenj.Main.DTO.Chat.OnlineDTO;
import org.example.calenj.Main.model.WebSokcetService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final WebSokcetService webSokcetService;
    private final Map<String, Boolean> isOnlineStatus = new HashMap<>();

    public WebSocketController(SimpMessagingTemplate template, WebSokcetService webSokcetService) {
        this.template = template;
        this.webSokcetService = webSokcetService;
    }

    @MessageMapping("/online")
    public void online(Authentication authentication, OnlineDTO isOnline) throws Exception {
        String username = webSokcetService.returnNickname(authentication);

        isOnlineStatus.put(username, true);
        isOnline.setOnlineStatusMap(isOnlineStatus);
        System.out.println("온라인 전환");
        template.convertAndSend("/topic/userOnline/" + isOnline.getGroupId(), isOnline.getOnlineStatusMap());
    }

    @MessageMapping("/offline")
    public void offline(Authentication authentication, OnlineDTO isOnline) throws Exception {
        String username = webSokcetService.returnNickname(authentication);

        isOnlineStatus.put(username, false);
        isOnline.setOnlineStatusMap(isOnlineStatus);

        System.out.println("오프라인 전환");
        template.convertAndSend("/topic/userOnline/" + isOnline.getGroupId(), isOnline.getOnlineStatusMap());
    }


    @MessageMapping("/chat/enter")
    public void enter(Authentication authentication, ChatMessageDTO message) throws Exception {
        String username = webSokcetService.returnNickname(authentication);
        message.setMessage(username + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/topic/chat/room/" + message.getGroupId(), message);
    }

}
