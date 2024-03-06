package org.example.calenj.Main.WebSocket;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequestMapping("/echo")
public class WebSocketEchoHandler extends TextWebSocketHandler {
    //CLIENTS 라는 변수에 세션을 담아두기위한 맵형식의 공간
    private static final ConcurrentHashMap<String, WebSocketSession> CLIENTS = new ConcurrentHashMap<String, WebSocketSession>();

    //사용자가 웹소켓 서버에 접속하게 되면 동작하는 메소드
    //이때 WebSocketSession 값이 생성 되는데, 그 값을 위에서 미리 만들어주는 CLIENTS 변수에 put으로 담아줌.(키값은 세션의 고유값)
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        CLIENTS.put(session.getId(), session);
    }

    //웹소켓 서버접속이 끝났을때 동작하는 메소드
    //CLIENTS 변수에 있는 해당 세션을 제거
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        CLIENTS.remove(session.getId());
    }

    //사용자의 메세지를 받게되면 동작하는 메소드
    //CLIENT 변수에 담긴 세션값들을 가져와서 반복문으로 돌려서 메세지를 발송해주면, 본인 이외의 사용자에게 메세지를 보낼 수 있는 코드
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String id = session.getId();  //메시지를 보낸 아이디
        CLIENTS.entrySet().forEach(arg -> {
            if (!arg.getKey().equals(id)) {  //같은 아이디가 아니면 메시지를 전달합니다.
                try {
                    arg.getValue().sendMessage(message);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
