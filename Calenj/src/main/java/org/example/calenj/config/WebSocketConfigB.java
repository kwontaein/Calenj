package org.example.calenj.config;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.WebSocket.ChatHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@RequiredArgsConstructor
@EnableWebSocket
public class WebSocketConfigB implements WebSocketConfigurer {

    private final ChatHandler chatHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler, "/ws/chat")
                .setAllowedOriginPatterns("http://*:8080", "http://*.*.*.*:8080")
                .withSockJS()
                .setClientLibraryUrl("http://localhost:8080/myapp/js/sock-client.js");
        //.setClientLibarayUrl은 그냥 sockjs CDN 주소를 입력해도 무관하다.
        /*Spring Boot에서 CORS 설정 시, .allowCredentials(true)와 .allowedOrigins("*")는 동시 설정을 못하도록 업데이트 되었다고 한다.
          모든 주소를 허용하는 대신 특정 패턴만 허용하는 것으로 적용해야한다고 변동됨.
          .allowedOrigins("*") 대신 .allowedOriginPatterns("*")를 사용하면 에러는 해결이 된다고 한다.
          나는 이처럼 하지 않고, http://localhost:8080 또는, IP 주소로 접속하기 때문에 위에 설정처럼 하였다.*/
    }
}
