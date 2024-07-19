package org.example.calenj.websocket.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.websocket.service.WebSocketService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final WebSocketService webSocketService;

    /**
     * 그룹 채팅
     *
     * @param authentication 인증정보
     * @param message        전달받은 여러 상태
     * @throws Exception 예외처리
     */
    @MessageMapping("/groupMsg")
    public void groupMsg(Authentication authentication, ChatMessageRequest message) throws Exception {
        webSocketService.defaultSend(authentication, message, "groupMsg");
    }

    /**
     * 친구 채팅
     *
     * @param authentication 인증정보
     * @param message        전달받은 여러 상태
     * @throws Exception 예외처리
     */
    @MessageMapping("/friendMsg")
    public void friendMsg(Authentication authentication, ChatMessageRequest message) throws Exception {
        webSocketService.defaultSend(authentication, message, "friendMsg");
    }

    /**
     * 개인 알림
     *
     * @param authentication 인증정보
     * @param message        전달받은 여러 상태
     * @throws Exception 예외처리
     */
    @MessageMapping("/personalTopic")
    public void personalTopic(Authentication authentication, ChatMessageRequest message) throws Exception {
        webSocketService.personalEvent(authentication, message);
    }

    /**
     * 세션 끊기
     *
     * @throws Exception 예외처리
     */
    @MessageMapping("/closeConnection")
    public void closeConnection() throws IOException {
    }
}
