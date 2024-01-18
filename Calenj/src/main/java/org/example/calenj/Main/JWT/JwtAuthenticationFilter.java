package org.example.calenj.Main.JWT;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
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
        
        System.out.println("doFilter 실행 ");

        // 1. Request Header 에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) request);
        System.out.println("token값 : " + token);

        String refreshToken = resolveRefreshToken((HttpServletRequest) request);
        System.out.println("refreshToken값 : " + refreshToken);

        // 2. validateToken 으로 토큰 유효성 검사 -- refresh token의 경우는? 추가해야함
        if (token != null && jwtTokenProvider.validateToken(token).equals("true")) {
            // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("if문 실행 authentication : " + authentication);

        } else if (jwtTokenProvider.validateToken(token).equals("Expired JWT Token")) { //토큰이 만료되었다면
            System.out.println("토큰이 만료되었습니다!");
            if (StringUtils.hasText(refreshToken) && jwtTokenProvider.validateToken(refreshToken).equals("true")) {//오류가 없다면
                System.out.println("새 토큰을 발행합니다!");
                //토큰 발행
                String newAccessToken = jwtTokenProvider.refreshAccessToken(refreshToken);

                // 새로운 Access Token으로 SecurityContext 업데이트
                Authentication newAuthentication = jwtTokenProvider.getAuthentication(newAccessToken);
                SecurityContextHolder.getContext().setAuthentication(newAuthentication);
                System.out.println("Access Token을 재발급했습니다. newAuthentication : " + newAuthentication);

            } else if (jwtTokenProvider.validateToken(refreshToken).equals("Expired JWT Token")) {
                System.out.println("모든 토큰이 만료되었습니다. 다시 로그인해주세요!");
            } else {
                // Refresh Token도 만료되었거나 없는 경우, 로그아웃 또는 다른 처리 수행
                System.out.println("오류 발생!" + jwtTokenProvider.validateToken(refreshToken));
            }
        } else {
            System.out.println("오류 발생!" + jwtTokenProvider.validateToken(token));
        }

        try {
            System.out.println("chain.doFilter 실행");
            chain.doFilter(request, response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        System.out.println("resolveToken실행 bearerToken : " + bearerToken);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // Refresh Token을 추출하는 메서드 -> DB에서 가져올건데 필요한것인가?
    private String resolveRefreshToken(HttpServletRequest request) {
        String refreshToken = request.getHeader("RefreshToken");

        System.out.println("resolveRefreshToken 실행 refreshToken : " + refreshToken);
        if (StringUtils.hasText(refreshToken) && refreshToken.startsWith("Bearer")) {
            return refreshToken.substring(7);
        }
        return null;
    }
}