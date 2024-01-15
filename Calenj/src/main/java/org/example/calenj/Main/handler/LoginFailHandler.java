package org.example.calenj.Main.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import java.io.IOException;
import java.net.URLEncoder;

public class LoginFailHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {

        String errorMessage = null;
        // exception 관련 메세지 처리
        if (exception instanceof BadCredentialsException) {
//			errorMessage = "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인하세요 ";
            errorMessage = "id or password invalid";
        } else if (exception instanceof InternalAuthenticationServiceException) {
//			errorMessage = "내부 시스템 문제로 로그인 요청을 처리할 수 없습니다. 관리자에게 문의하세요. ";
            errorMessage = "inside problem talk to admin ";
        } else if (exception instanceof UsernameNotFoundException) {
//			errorMessage = "존재하지 않는 계정입니다. 회원가입 후 로그인해주세요.";
            errorMessage = "not exist account. use after Sign up";
        } else if (exception instanceof AuthenticationCredentialsNotFoundException) {
//			errorMessage = "인증 요청이 거부되었습니다. 관리자에게 문의하세요.";
            errorMessage = "access denied. talk to admin";
        } else {
//			errorMessage = "알 수 없는 오류로 로그인 요청을 처리할 수 없습니다. 관리자에게 문의하세요.";
            errorMessage = "unknown error. talk to admin";
        }

        errorMessage = URLEncoder.encode(errorMessage, "UTF-8");
        setDefaultFailureUrl("/login?error=true&exception=" + errorMessage);

        super.onAuthenticationFailure(request, response, exception);
    }
}