package org.example.calenj.websocket.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.websocket.service.WebSokcetService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final WebSokcetService webSokcetService;

    //그룹 채팅
    @MessageMapping("/groupMsg")
    public void groupMsg(Authentication authentication, ChatMessageRequest message) throws Exception {
        webSokcetService.defaultSend(authentication, message, "groupMsg");
    }

    //친구에게 알림 보내기
    @MessageMapping("/friendMsg")
    public void friendMsg(Authentication authentication, ChatMessageRequest message) throws Exception {
        webSokcetService.defaultSend(authentication, message, "friendMsg");
    }

    //알림을 위한 개인 구독 (온라인 전환도 할 예정)
    @MessageMapping("/personalTopic")
    public void personalTopic(Authentication authentication, ChatMessageRequest message) throws Exception {
        webSokcetService.personalEvent(authentication, message);
    }

    //세션 끊기
    @MessageMapping("/closeConnection")
    public void closeConnection(WebSocketSession session) throws IOException {
        System.out.println("session : " + session);
        session.close();
    }
}
