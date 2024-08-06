package org.example.calenj.naverApi.service;

import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import org.example.calenj.naverApi.dto.response.NaverMapResponse;
import org.example.calenj.naverApi.dto.response.NaverSearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import javax.net.ssl.SSLException;


@Service
public class NaverService {
    @Value("${naver.direction5.uri}")
    private String uriPath;

    @Value("${naver.direction5.clientId}")
    private String directionClientId;

    @Value("${naver.direction5.clientSecret}")
    private String directionClientSecret;

    @Value("${naver.search.clientId}")
    private String searchClientId;

    @Value("${naver.search.clientSecret}")
    private String searchClientSecret;

    public NaverMapResponse direction(String start, String goal) {
        String option = "trafast";

        HttpClient httpClient = HttpClient.create().secure(t -> {
            try {
                t.sslContext(SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE).build());
            } catch (SSLException e) {
                System.out.println(e);
            }
        });

        WebClient client = WebClient.builder()
                .baseUrl(uriPath)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();

        NaverMapResponse responses = client.get().uri(uriBuilder -> uriBuilder.path("")
                        .queryParam("start", start)
                        .queryParam("goal", goal)
                        .queryParam("option", option)
                        .build())
                .header("X-NCP-APIGW-API-KEY-ID", directionClientId)
                .header("X-NCP-APIGW-API-KEY", directionClientSecret)
                .retrieve()              // 응답을 받게 하되,
                .bodyToMono(NaverMapResponse.class) // 응답 값을 하나만,
                .block();                  // 동기로 받으려 한다.

        System.out.println(" responses : " + responses);
        return responses;
    }

    public NaverSearchResponse locationSearch(String searchValue) {
        WebClient client = WebClient.builder()
                .baseUrl("https://openapi.naver.com/v1/search/local.json")
                .build();

        NaverSearchResponse response = client.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("query", searchValue)
                        .queryParam("display", 10)
                        .queryParam("start", 1)
                        .queryParam("sort", "random")
                        .build())
                .header("X-Naver-Client-Id", searchClientId)
                .header("X-Naver-Client-Secret", searchClientSecret)
                .retrieve()
                .bodyToMono(NaverSearchResponse.class)
                .block();

        System.out.println("Response: " + response);
        return response;
    }

}
