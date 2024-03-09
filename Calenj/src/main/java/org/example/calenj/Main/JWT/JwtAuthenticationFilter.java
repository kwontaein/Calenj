package org.example.calenj.Main.JWT;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    //doFilter 메소드가 가장 먼저 실행되는 이유 : 클라이언트의 HTTP 요청이 서블릿 컨테이너에 도달하기 전에 필터가 요청을 가로채어 원하는 작업을 수행하기 때문
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        System.out.println("-------------------------------------------------------------doFilter 실행------------------------------------------------------------- ");

        //request로 받은 token을 구분해주는 메소드
        String[] tokens = resolveCookieFilter((HttpServletRequest) request);

        String token = tokens[0];
        String refreshToken = tokens[1];

        // 1. Request Header 에서 JWT 토큰 추출
        System.out.println("token값 : " + token);
        System.out.println("refreshToken값 : " + refreshToken);



        // 2. validateToken 으로 토큰 유효성 검사 -- refresh token의 경우는? 추가해야함
        if (token != null && jwtTokenProvider.validateToken(token).equals("true")) {

            // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서
            Authentication authentication = jwtTokenProvider.getAuthentication(token);

            // SecurityContext 에 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("if문 실행 authentication : " + authentication);

            //accessToken 체크
        } else if (jwtTokenProvider.validateToken(token).equals("Expired JWT Token")) { //토큰이 만료되었다면

            System.out.println("토큰이 만료되었습니다!");
            //refreshToken체크 => 유효할 경우 accessToken만 재발급
            if (StringUtils.hasText(refreshToken) && jwtTokenProvider.validateToken(refreshToken).equals("true")) {//오류가 없다면
                System.out.println("새 토큰을 발행합니다!");
                //토큰 발행
                JwtToken newToken = jwtTokenProvider.refreshAccessToken(refreshToken);
                // 새로운 Access Token으로
                Authentication newAuthentication = jwtTokenProvider.getAuthentication(newToken.getAccessToken());
                //SecurityContext 업데이트
                SecurityContextHolder.getContext().setAuthentication(newAuthentication);

                System.out.println("Access Token을 재발급했습니다. newAccessToken : " + newToken);

            } else if (jwtTokenProvider.validateToken(refreshToken).equals("Expired JWT Token")) {

                // Refresh Token도 만료되었거나 없는 경우, 로그아웃 또는 다른 처리 수행
                System.out.println("모든 토큰이 만료되었습니다. 다시 로그인해주세요!");
            } else {

                System.out.println("예외 발생!" + jwtTokenProvider.validateToken(refreshToken));
            }
        } else { // 쿠키에 값이 없거나 여러 상황

        }
        try {
            System.out.println("chain.doFilter 실행");
            chain.doFilter(request, response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    //헤더 쿠키에서 토큰 값 가져오는 메소드
    private String[] resolveCookieFilter(HttpServletRequest request) {
        Cookie[] requestCookie = request.getCookies(); // 리퀘스트 헤더에서 쿠키 목록 가져오기
        String[] tokenList = new String[2];

        if (requestCookie != null) {
            for (Cookie cookie : requestCookie) {
                if ("accessToken".equals(cookie.getName())) {
                    tokenList[0] = cookie.getValue();
                    System.out.println("cookie에서 가져온 accessToken : " + tokenList[0]);
                } else if ("refreshToken".equals(cookie.getName())) {
                    tokenList[1] = cookie.getValue();
                    System.out.println("cookie에서 가져온 refreshToken : " + tokenList[1]);
                }
            }
        }
        return tokenList;
    }
}