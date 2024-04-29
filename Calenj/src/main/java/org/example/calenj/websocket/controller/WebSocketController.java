package org.example.calenj.websocket.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.websocket.dto.request.AlarmRequest;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.websocket.dto.response.ChatMessageResponse;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.websocket.service.WebSokcetService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final WebSokcetService webSokcetService;
    private final GlobalService globalService;

    //그룹 채팅
    @MessageMapping("/groupMsg")
    public void groupMsg(Authentication authentication, ChatMessageRequest message) throws Exception {
        defaultSend(authentication, message, "groupMsg");
    }

    //친구에게 알림 보내기
    @MessageMapping("/friendMsg")
    public void friendMsg(Authentication authentication, ChatMessageRequest message) throws Exception {
        defaultSend(authentication, message, "friendMsg");
    }

    //알림을 위한 개인 구독 (온라인 전환도 할 예정)
    @MessageMapping("/personalTopic")
    public void personalTopic(Authentication authentication, AlarmRequest request) throws Exception {
        System.out.println("request.getOnlineState() : " + request.getOnlineState());
        personalEvent(authentication, request);
    }


    private void defaultSend(Authentication authentication, ChatMessageRequest message, String target) {
        String username = webSokcetService.returnNickname(authentication);
        String userEmail = webSokcetService.returnEmail(username);
        String nowTime = globalService.nowTime();

        message.setNickName(username);
        message.setUserEmail(userEmail);
        message.setSendDate(nowTime);

        ChatMessageResponse response = filterNullFields(message);

        //알림 갯수 반환
        if (message.getState() == ChatMessageRequest.fileType.ALARM) {

            try {

                // 파일로부터 채팅 내용을 읽어와서 보내기
                int setPoint = webSokcetService.countLinesUntilEndPoint(message);
                response.setEndPoint(setPoint);
                template.convertAndSendToUser(response.getUserEmail(), "/topic/" + target + "/" + response.getParam(), response);

            } catch (Throwable e) {

                // 에러가 발생할 경우.
                e.printStackTrace();

            }
            // State가 1이라면 일반 메시지
        } else if (message.getState() == ChatMessageRequest.fileType.READ) {

            List<String> file = webSokcetService.readGroupChattingFile(message);
            response.setMessage(file);
            template.convertAndSendToUser(response.getUserEmail(), "/topic/" + target + "/" + response.getParam(), response);

        } else if (message.getState() == ChatMessageRequest.fileType.RELOAD) {

            List<String> file = webSokcetService.readGroupChattingFileSlide(message);
            response.setMessage(file);
            template.convertAndSendToUser(response.getUserEmail(), "/topic/" + target + "/" + response.getParam(), response);

        } else if (message.getState() == ChatMessageRequest.fileType.SEND) {

            webSokcetService.saveChattingToFile(message);
            response.setMessage(Collections.singletonList(message.getMessage()));
            response.setChatUUID(message.getChatUUID());
            System.out.println(response);
            template.convertAndSend("/topic/" + target + "/" + response.getParam(), response);

            //2라면 나갈 때 엔드포인트 설정
        } else if (message.getState() == ChatMessageRequest.fileType.ENDPOINT) {

            //파일에 엔드포인트 저장
            webSokcetService.saveChattingToFile(message);
        }
    }

    private void personalEvent(Authentication authentication, AlarmRequest request) {
        String username = webSokcetService.returnNickname(authentication);
        String userEmail = webSokcetService.returnEmail(username);

        if (request.getOnlineState() != null) {
            webSokcetService.OnlineChange(request, userEmail);
        }
    }

    // null이 아닌 필드만 포함시키는 메소드
    private ChatMessageResponse filterNullFields(ChatMessageRequest request) {
        ChatMessageResponse filteredResponse = new ChatMessageResponse();
        if (request.getParam() != null) {
            filteredResponse.setParam(request.getParam());
        }
        if (request.getMessage() != null) {
            filteredResponse.setMessage(Collections.singletonList(request.getMessage()));
        }
        if (request.getNickName() != null) {
            filteredResponse.setNickName(request.getNickName());
        }
        if (request.getUserEmail() != null) {
            filteredResponse.setUserEmail(request.getUserEmail());
        }
        if (request.getSendDate() != null) {
            filteredResponse.setSendDate(request.getSendDate());
        }


        filteredResponse.setState(request.getState());
        filteredResponse.setEndPoint(request.getEndPoint());
        // 필요한 필드들을 추가로 확인하여 null이 아닌 것만 설정
        return filteredResponse;
    }
}
