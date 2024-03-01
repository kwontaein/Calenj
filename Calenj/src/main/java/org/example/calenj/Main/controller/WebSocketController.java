package org.example.calenj.Main.controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/hello") ///hello 라는 메시지 매핑을 처리
    @SendTo("/topic/greetings")//클라이언트가 메시지를 보내면 /topic/greetings 주제로 응답
    public String greeting(String message) {
        return "Hello, " + message + "!";
    }
}