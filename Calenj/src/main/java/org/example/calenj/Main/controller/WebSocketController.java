package org.example.calenj.Main.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Request.Chat.AlarmRequest;
import org.example.calenj.Main.DTO.Request.Chat.ChatMessageRequest;
import org.example.calenj.Main.DTO.Response.Chat.ChatMessageResponse;
import org.example.calenj.Main.DTO.Response.User.UserSubscribeResponse;
import org.example.calenj.Main.Service.WebSoket.WebSokcetService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.FileReader;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final WebSokcetService webSokcetService;

    @MessageMapping("/online")
//    @SendTo("/topic/online-users")
    public String handleOnlineMessage(UserSubscribeResponse message) {
        // 메시지를 처리하는 로직을 구현
        System.out.println("Received message: " + message.getUserId());
        return "Received message: " + message;
    }

    //그룹 채팅
    //그룹 채팅
    @MessageMapping("/groupMsg")
    public void groupMsg(Authentication authentication, ChatMessageRequest message) throws Exception {
        String username = webSokcetService.returnNickname(authentication);
        String file = webSokcetService.readGroupChattingFile(message);
//        System.out.println(file);
        System.out.println(message.getGroupMsg());
        if (message.getState() == 0) {
            System.out.println("파일로드");
            try {
                // 파일로부터 채팅 내용을 읽어와서 보내기
                message.setMessage(file);
                template.convertAndSend("/topic/groupMsg/" + message.getGroupMsg(), message);
            } catch (Throwable e) {
                // 에러가 발생할 경우.
                e.printStackTrace();
            }    // State가 1이라면 일반 메시지

        } else if (message.getState() == 1) {
            webSokcetService.saveChattingToFile(message);
            message.setMessage(username + " : " + message.getMessage());
            template.convertAndSend("/topic/groupMsg/" + message.getGroupMsg(), message);
        }
    }

    //알림을 위한 개인 구독 (온라인 전환도 할 예정)
    @MessageMapping("/personalTopic")
    public void personalTopic(AlarmRequest alarmRequest) throws Exception {
        // 개인 토픽 DB 저장(?)
        // EventEntity 저장 ?

        // DB 저장? -> 웹소켓 (실시간 알림 가능하다) -> 알림을 어떻게 보내야 하는가
        // 로그아웃시 -> 엔드포인트 저장

        // 나만 로그인 ->
        // 나빼고 로그인 ->
        // 아무도 안함 ->
        // 다 함 ->
        System.out.println("alarmDTO : " + alarmRequest);
        System.out.println("/topic/personalTopic/" + alarmRequest.getPersonalTopic());
        template.convertAndSend("/topic/personalTopic/" + alarmRequest.getPersonalTopic(), alarmRequest);
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
