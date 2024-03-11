package org.example.calenj.Main.JWT;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Objects;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

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

        // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서
        Authentication authentication;

        // 2. validateToken 으로 토큰 유효성 검사
        if (token != null && jwtTokenProvider.validateToken(token).equals("true")) {

            authentication = jwtTokenProvider.getAuthentication(token);

            // SecurityContext 에 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("authentication : " + authentication);

        } else if (jwtTokenProvider.validateToken(token).equals("Expired JWT Token")) { //토큰이 만료되었다면

            System.out.println("토큰이 만료되었습니다!");

            authentication = jwtTokenProvider.getAuthentication(token);
            UserEntity userEntity = userRepository.findByUserEmail(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

            String DbRefreshToken = userEntity.getRefreshToken();
            System.out.println(DbRefreshToken);

            if (DbRefreshToken != null && !Objects.equals(DbRefreshToken, refreshToken)) {
                //DB에 저장된 값과 일치하지 않는 경우 처리
                //내가로그인한 상태 -> 다른데서 로그인 -> 나는 DB랑 쿠키값이 달라 -> 저쪽은 두개 다 똑같애 -> 나는 로그아웃되고 -> 저쪽에서 로그인

                removeCookie((HttpServletResponse) response);
                userRepository.updateUserRefreshTokenToNull(authentication.getName());
                System.out.println("다른 곳에서 로그인되었습니다. 로그아웃됩니다");

                // 리스폰스에 정보 담아 반환
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                httpResponse.setStatus(HttpServletResponse.SC_FOUND); // 302 Found

            } else if (StringUtils.hasText(refreshToken) && jwtTokenProvider.validateToken(refreshToken).equals("true") && Objects.equals(DbRefreshToken, refreshToken)) {

                //리프레쉬 토큰이 만료되지 않았고 오류가 없고 DB에 저장된 값과 일치하다면(Redis 수정 예정)
                System.out.println("새 토큰을 발행합니다!");

                //토큰 발행
                JwtToken newToken = jwtTokenProvider.refreshAccessToken(refreshToken);

                // 새로운 Access Token으로
                authentication = jwtTokenProvider.getAuthentication(newToken.getAccessToken());

                //SecurityContext 업데이트
                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("Access Token을 재발급했습니다. newAccessToken : " + newToken);

            } else if (jwtTokenProvider.validateToken(refreshToken).equals("Expired JWT Token")) {
                // Refresh Token도 만료된 경우, 로그아웃 처리 수행 후 로그인 페이지로 유도
                // 쿠키 삭제
                removeCookie((HttpServletResponse) response);
                String email = authentication.getName();
                System.out.println("authentication.getname : " + email);

                userRepository.updateUserRefreshTokenToNull(email);

                System.out.println("모든 토큰이 만료되었습니다. 다시 로그인해주세요!");

                // 리스폰스에 정보 담아 반환
                HttpServletResponse httpResponse = (HttpServletResponse) response;
                httpResponse.setStatus(HttpServletResponse.SC_FOUND); // 302 Found
                /*httpResponse.setContentType("text/plain"); // 본문의 형식을 지정합니다. 여기서는 일반 텍스트로 설정하였습니다.
                PrintWriter writer = httpResponse.getWriter();
                writer.println("모든 토큰이 만료되었습니다. 재로그인해주세요.");
                writer.close();*/
            } else {

                System.out.println("예외 발생!" + jwtTokenProvider.validateToken(refreshToken));

            }
        } else {
            // 쿠키에 값이 없거나 여러 상황
            System.out.println("쿠키에 값이 없습니다. 다시 로그인해주세요");

            // 리스폰스에 정보 담아 반환
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(HttpServletResponse.SC_FOUND); // 302 Found
             /* httpResponse.setContentType("text/plain"); // 본문의 형식을 지정합니다. 여기서는 일반 텍스트로 설정하였습니다.
            PrintWriter writer = httpResponse.getWriter();
            writer.println("쿠키에 값이 없습니다. 다시 로그인해주세요");
            writer.close();*/
            //로그인 페이지로 일시적으로 이동
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