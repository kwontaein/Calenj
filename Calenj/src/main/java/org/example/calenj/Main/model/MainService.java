package org.example.calenj.Main.model;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainService {
    //쿠키에서 토큰 정보 빼기
    public String extractTokenFromCookieHeader(String cookieHeader, String targetCookieName) {
        if (cookieHeader != null) {
            // 쿠키 헤더를 각각의 쿠키로 분할합니다.
            String[] cookies = cookieHeader.split("; ");

            // 각 쿠키를 반복하면서 처리합니다.
            for (String cookie : cookies) {
                // 각 쿠키를 이름-값 쌍으로 분할합니다.
                String[] parts = cookie.split("=");

                // 현재 쿠키가 이름과 값 모두를 갖고 있는지 확인합니다.
                if (parts.length == 2) {
                    String name = parts[0];
                    String value = parts[1];

                    // 현재 쿠키가 대상 쿠키의 이름과 일치하는지 확인합니다.
                    if (name.equals(targetCookieName)) {
                        return value; // 대상 쿠키의 값 반환
                    }
                }
            }
        }
        return null; // 헤더에서 대상 쿠키를 찾지 못한 경우 null 반환
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
