package org.example.calenj.global.JWT;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.calenj.global.service.RedisService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;

    //doFilter 메소드가 가장 먼저 실행되는 이유 : 클라이언트의 HTTP 요청이 서블릿 컨테이너에 도달하기 전에 필터가 요청을 가로채어 원하는 작업을 수행하기 때문
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        //request로 받은 token을 구분해주는 메소드
        String[] tokens = resolveCookieFilter((HttpServletRequest) request);
        // 1. Request Header 에서 JWT 토큰 추출
        String token = tokens[0];
        Authentication authentication;
        String DbRefreshToken;
        String RefreshValidate;
        if (token == null) {
            System.out.println("토큰이 없다고?");
            authentication = null;
            DbRefreshToken = null;
            RefreshValidate = null;
        } else {
            authentication = jwtTokenProvider.getAuthentication(token);
            DbRefreshToken = redisService.getUserTokenById(authentication.getName());
            RefreshValidate = jwtTokenProvider.validateToken(DbRefreshToken);
            System.out.println("토큰이 있음\n" +
                    "\nauthentication : " + authentication +
                    "\nDbRefreshToken : " + DbRefreshToken +
                    "\nRefreshValidate : " + RefreshValidate);
        }
        // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서
        HttpServletResponse httpResponse = (HttpServletResponse) response;


        // 2. validateToken 으로 토큰 유효성 검사
        if (token != null && jwtTokenProvider.validateToken(token).equals("true")) {

            response = tokenTrue(token, httpResponse, authentication);
        } else if (jwtTokenProvider.validateToken(token).equals("Expired JWT Token")) { //토큰이 만료되었다면
            //GetWriter()가 이미 선언되었다는 오류가 생김 -> doFilter 동작방식에 이유가 있었음
            //RESPONSE 를 상위에 선언할 경우, 서블릿에서 서비스로 넘기지 않고 바로 반환함(고로 여기 작성)
            PrintWriter writer = httpResponse.getWriter();

            if (DbRefreshToken == null) {
                httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN); // 403
                httpResponse.setContentType("application/json");
            } else if (DbRefreshToken != null && RefreshValidate.equals("true")) { //리프레시 토큰이 있고, 유효한지 검사
                //토큰 발행
                JwtToken newToken = jwtTokenProvider.refreshAccessToken(authentication, DbRefreshToken);
                authentication = jwtTokenProvider.getAuthentication(newToken.getAccessToken());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else if (!RefreshValidate.equals("true")) {
                response = tokenFalse(httpResponse, authentication);
                writer.print("Invalid JWT Token");
            }

            writer.flush();
            writer.close();
            // 이미 응답이 작성되었는지 확인
            if (httpResponse.isCommitted()) {
                // 이미 응답이 작성되었다면 필터 체인을 진행하지 않고 바로 반환
                return;
            }
        } else {
            System.out.println("로그인하십쇼!!!");
        }
        try {
            chain.doFilter(request, response);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }


    }


    private ServletResponse tokenTrue(String token, HttpServletResponse httpResponse, Authentication authentication) {
        // SecurityContext 에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);

        authentication = jwtTokenProvider.getAuthentication(token);
        String DbRefreshToken = redisService.getUserTokenById(authentication.getName());
        if (DbRefreshToken == null || !jwtTokenProvider.validateToken(DbRefreshToken).equals("true")) {
            //RefreshToken 값이 비었다면
            removeCookie(httpResponse);
            httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
            httpResponse.setContentType("application/json");
        }
        return httpResponse;
    }

    private ServletResponse tokenFalse(HttpServletResponse httpResponse, Authentication authentication) {
        System.out.println("tokenFalse 실행");
        removeCookie(httpResponse);
        redisService.deleteUserToken(authentication.getName());
        // 리스폰스에 정보 담아 반환
        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
        httpResponse.setContentType("application/json"); // 본문의 형식을 지정합니다. 여기서는 일반 텍스트로 설정하였습니다.
        return httpResponse;
    }


    //헤더 쿠키에서 토큰 값 가져오는 메소드
    private String[] resolveCookieFilter(HttpServletRequest request) {
        Cookie[] requestCookie = request.getCookies(); // 리퀘스트 헤더에서 쿠키 목록 가져오기
        String[] tokenList = new String[2];

        if (requestCookie != null) {
            for (Cookie cookie : requestCookie) {
                if ("accessToken".equals(cookie.getName())) {
                    tokenList[0] = cookie.getValue();
                } else if ("refreshToken".equals(cookie.getName())) {
                    tokenList[1] = cookie.getValue();
                }
            }
        }
        return tokenList;
    }

    public void removeCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("accessToken", null);
        Cookie cookie2 = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie2.setMaxAge(0);
        cookie2.setPath("/");
        response.addCookie(cookie);
        response.addCookie(cookie2);
    }
}