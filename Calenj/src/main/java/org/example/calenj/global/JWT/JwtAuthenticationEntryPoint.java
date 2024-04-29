package org.example.calenj.global.JWT;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

       /* // 인증 부족 예외인 경우
        if (authException instanceof DisabledException) {
            // 403 Forbidden 응답과 함께 메시지 전송
            System.out.println("Account disabled");
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Account disabled");
        }
        // 자격 증명이 잘못된 경우
        else if (authException instanceof BadCredentialsException) {
            // 401 Unauthorized 응답과 함께 메시지 전송
            System.out.println("Bad credentials");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Bad credentials");
        }
        // 계정이 잠겨 있는 경우
        else if (authException instanceof LockedException) {
            // 401 Unauthorized 응답과 함께 메시지 전송
            System.out.println("Account locked");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Account locked");
        }
        // 자격 증명이 만료된 경우
        else if (authException instanceof CredentialsExpiredException) {
            // 401 Unauthorized 응답과 함께 메시지 전송
            System.out.println("Credentials expired");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Credentials expired");
        }
        // 계정이 만료된 경우
        else if (authException instanceof AccountExpiredException) {
            // 401 Unauthorized 응답과 함께 메시지 전송
            System.out.println("Account expired");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Account expired");
        }
        // 인증 서비스에서 예외가 발생한 경우
        else if (authException instanceof AuthenticationServiceException) {
            // 500 Internal Server Error 응답과 함께 메시지 전송
            System.out.println("Authentication service error");
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Authentication service error");
        }
        // 기타 예외인 경우
        else {
            // 401 Unauthorized 응답과 함께 기본 메시지 전송
            System.out.println("Unauthorized");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }*/
    }
}
