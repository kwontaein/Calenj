package org.example.calenj.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketMessageConfig implements WebSocketMessageBrokerConfigurer {


    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        System.out.println("실행 configureMessageBroker");
        config.enableSimpleBroker("/topic");//sub 보낼때
        config.setApplicationDestinationPrefixes("/app");//pub 받을때
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        System.out.println("실행 registerStompEndpoints");
        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*").withSockJS();

    }
}
