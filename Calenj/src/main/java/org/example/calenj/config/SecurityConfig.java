package org.example.calenj.config;

import org.example.calenj.Main.JWT.JwtAuthenticationFilter;
import org.example.calenj.Main.JWT.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final String[] allAllowedUrls = {"/api/**"};    // 모두 허가
    private final String[] UserAllowedUrls = {"/**"};    // 유저만 허가
    private final String[] AdminAllowedUrls = {"/**"};    // 매니저만 허가
    private final String[] ManagerAllowedUrls = {"/api/testSuccess"};    // 관리자만 허가

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    //private String logout_url = "https://kauth.kakao.com/oauth/logout?client_id=${kakao.client.id}&logout_redirect_utl=${kakao.logout_redirect_url}";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf((csrf) -> csrf.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                // USER, ADMIN 접근 허용
                .headers((headers) -> headers.addHeaderWriter(
                        new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)))
                .authorizeHttpRequests(requests ->
                        requests.requestMatchers(allAllowedUrls).permitAll()    // 허용할 url 목록을 배열로 분리했다
                                .requestMatchers(ManagerAllowedUrls).hasRole("MANAGER")   // Manager 역할을 갖고 있는 경우
                                .requestMatchers(PathRequest.toH2Console()).permitAll()
                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() { //Oauth2 로그인
        return new DefaultOAuth2UserService();
    }

    // 애플리케이션의 다른 부분에서 비밀번호를 안전하게 다룰 때 활용
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
       /* 비밀번호 암호화 단일한 암호화 알고리즘을 사용합니다. 주로 BCrypt 해시 함수를 이용하여 비밀번호를 해싱합니다.
        강력한 해시 함수를 사용하여 보안성이 높습니다.
        사용자가 설정한 알고리즘을 사용하는 대신 BCrypt 알고리즘을 고정적으로 사용*/
        return new BCryptPasswordEncoder();
    }

    /*@Bean
    public PasswordEncoder passwordEncoder() {
        *//*DelegatingPasswordEncoder는 여러 개의 해시 알고리즘을 지원하며, 알고리즘은 PasswordEncoderFactories를 통해 동적으로 선택됩니다.
        여러 해시 알고리즘 중에서 현재 사용 중인 해시를 식별하는 프릭스(prefix)를 사용하여 암호화합니다.
        개방성이 높아서 여러 알고리즘을 쉽게 변경할 수 있습니다.
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();*//*
        return new BCryptPasswordEncoder();
    }*/
}