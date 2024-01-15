package org.example.calenj.config;

import org.example.calenj.Main.handler.LoginFailHandler;
import org.example.calenj.Main.handler.LoginSuccessHandler;
import org.example.calenj.Main.model.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    MainService mainService;
    private final LoginSuccessHandler loginSuccessHandler = new LoginSuccessHandler();
    private final LoginFailHandler loginFailHandler = new LoginFailHandler();

    //private String logout_url = "https://kauth.kakao.com/oauth/logout?client_id=${kakao.client.id}&logout_redirect_utl=${kakao.logout_redirect_url}";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
                        //.permitAll() 모두 허가 ,hasRole("role") role 역할을 가진사람만 접근 ,
                        //.access("hasRole('ADMIN') or hasRole('MANAGER')") MANAGER와 ADMIN인 경우 접근 가능
                        // .antMatchers("/admin/**").hasAnyRole("ADMIN", "MANAGER") 위와 같은 역할
                        .requestMatchers(new AntPathRequestMatcher("/kakao/callback")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll())
                // USER, ADMIN 접근 허용
                .headers((headers) -> headers
                        .addHeaderWriter(
                                new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter
                                        .XFrameOptionsMode.SAMEORIGIN)))

                // 로그인 페이지 -> 로그인 실행 url -> 실패,성공 핸들러 -> 성공페이지
                .formLogin((formLogin) -> formLogin
                        .loginPage("/login")
                        .usernameParameter("account_id")
                        .passwordParameter("user_password")
                        .loginProcessingUrl("/login_p")
                        .successHandler(loginSuccessHandler)
                        .failureHandler(loginFailHandler)
                        .defaultSuccessUrl("/user_access"))

                // oauth2 로그인 관련(카카오)
                /* .oauth2Login((oauth2Login) -> oauth2Login.loginPage("/KakaoLogin")
                         .userInfoEndpoint()
                         .userService(oauth2UserService()))*/

                // 권한 없이도 페이지 접근 가능하게 함
                .csrf(csrf -> csrf.disable())

                // 로그아웃 관련
                .logout((logout) -> logout.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .invalidateHttpSession(true) // 세션 해제
                        .clearAuthentication(true) // 사용자 인증 정보 지우기
                        .deleteCookies("JSESSIONID").logoutSuccessUrl("/"))

                // 세션 유지 관련
                .sessionManagement((sessionManagement) -> sessionManagement.maximumSessions(1)
                        .maxSessionsPreventsLogin(true).expiredUrl("/"));
        return http.build();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
        return new DefaultOAuth2UserService();
    }

    // 사용자 인증과 관련된 설정을 수행
    // 비밀번호 인코딩 방법을 지정하고, 사용자 서비스를 연결하는 등의 작업을 수행
   /* public void configure(AuthenticationManagerBuilder auth, HttpSecurity http, WebSecurity web) throws Exception {
        // 세션 고정 보호 설정 코드
        // changeSessionId() : 사용자가 인증을 시도하게 되면 사용자 세션은 그대로 두고 세션 아이디만 변경을 합니다.
        // newSession()- : 새로운 세션과 아이디 생성하며 이전의 설정 값들은 사용 불가합니다.
        // none() : 아무런 보호 X
        // SessionCreationPolicy.Always : 스프링 시큐리티가 항상 세션 생성합니다.
        // SessionCreationPolicy.If_Required : 스프링 시큐리티가 필요 시 생성합니다.(default)
        // SessionCreationPolicy.Never : 스프링 시큐리티가 생성하지 않지만 이미 존재하면 사용합니다.
        // SessionCreationPolicy.Stateless : 스프링 시큐리티가 생성하지 않고 존재해도 사용하지 않습니다. (JWT와 같이
        // 세션을 사용하지 않는 경우 사용)
        http.sessionManagement((sessionManagement) -> sessionManagement.sessionFixation().changeSessionId()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));
        // 스프링 시큐리티와 연동하여 사용자 인증 및 권한 관리에서 사용
        auth.userDetailsService(mainService).passwordEncoder(new BCryptPasswordEncoder());

        web.httpFirewall(defaultHttpFirewall());
    }*/

    // 애플리케이션의 다른 부분에서 비밀번호를 안전하게 다룰 때 활용
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() { // 비밀번호 암호화
        return new BCryptPasswordEncoder();
    }
}
