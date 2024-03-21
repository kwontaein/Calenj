package org.example.calenj.Main.controller;

import org.example.calenj.Main.DTO.Chat.ChatMessageDTO;
import org.example.calenj.Main.DTO.Chat.Greeting;
import org.example.calenj.Main.DTO.Chat.HelloMessage;
import org.example.calenj.Main.model.GlobalService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final GlobalService globalService;

    //------------------------------Spring 공식 문서 코드---------------------------------
    public GreetingController(SimpMessagingTemplate template, GlobalService globalService) {
        this.template = template;
        this.globalService = globalService;
    }

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception { //이름만
        System.out.println("실행 greeting");
        Thread.sleep(1000); // simulated delay
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

    //------------------------------인터넷에서 찾아본 코드---------------------------------
    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/pub/chat/enter"
    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDTO message) throws Exception {
        message.setMessage(message.getNickName() + " : " + message.getMessage());
        System.out.println(message.getMessage());
        template.convertAndSend("/topic/chat/room/" + message.getGroupId(), message);
    }

    @MessageMapping("/chat/enter")
    public void enter(ChatMessageDTO message) throws Exception {
        message.setMessage(message.getNickName() + "님이 채팅방에 참여하였습니다.");
        System.out.println(message.getMessage());
        template.convertAndSend("/topic/chat/room/" + message.getGroupId(), message);
    }

}
