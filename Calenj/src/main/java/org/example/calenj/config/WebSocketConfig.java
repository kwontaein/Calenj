package org.example.calenj.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    //endpoint를 /stomp로 하고, allowedOrigins를 "*"로 하면 페이지에서 Get /info 404 Error가 발생한다.
    // 그래서 아래와 같이 2개의 계층으로 분리하고 origins를 개발 도메인으로 변경하니 잘 동작하였다.
    // -> cors 오류인듯 싶읍니다 선생님

    // Stomp 엔드포인트 등록을 위한 메서드입니다.
    // 웹소켓 엔드포인트를 "/stomp/chat"로 지정하고, 허용된 오리진은 "http://localhost:8080"입니다.
    // SockJS를 사용하여 설정합니다.
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //클라이언트에서 WebSocket에 접속할 수 있는 endpoint를 지정한다.
        registry.addEndpoint("/stomp/chat")
                .setAllowedOrigins("http://localhost:8080")
                .withSockJS();
    }

    // 메시지 브로커 구성을 위한 메서드입니다.
    // 애플리케이션 내부에서 사용할 path는 "/pub"로 지정합니다.
    // 구독자에게 메시지를 전송할 때 "/sub" 프리픽스를 사용합니다.
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //enableSimpleBroker에서는 해당 주소를 구독하는 클라이언트에게 메시지를 보낸다
        registry.setApplicationDestinationPrefixes("/pub");
        // setApplicationDestinationPrefixes에는 메시지 발행 요청의 prefix를 넣는다.
        registry.enableSimpleBroker("/sub");
    }

    //setAllowedOrigins("")에서라는 와일드 카드를 사용하면
    //보안상의 문제로 전체를 허용하는 것보다 직접 하나씩 지정해주어야 한다고 한다.
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        //registration.interceptors(new FilterChannelInterceptor());
    }
}
