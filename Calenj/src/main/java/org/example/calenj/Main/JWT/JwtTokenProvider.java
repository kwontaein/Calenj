package org.example.calenj.Main.JWT;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {

    @Autowired
    UserRepository userRepository;
    @Autowired
    HttpServletResponse response;
    private final Key key;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // 클레임에서 권한 추출을 위한 도우미 메서드
    private Collection<? extends GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
        if (claims.get("auth") == null) {
            throw new RuntimeException("토큰에 권한이 포함되어 있지 않습니다.");
        }
        return Arrays.stream(claims.get("auth").toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    // 유저 정보를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
    // -> DB 에서 refreshToken 값이 있다면 AccessToken생성 메소드만 실행. 
    // 없다면 두개 다 생성 메소드 실행
    public JwtToken generateToken(Authentication authentication) {

        System.out.println("토큰 생성 실행");

        String accessToken = generateAccessTokenInFirstTime(authentication);
        String refreshToken = generateRefreshToken();

        //쿠키 생성 부분
        createCookie(response, "accessToken", accessToken);
        createCookie(response, "refreshToken", refreshToken);

        System.out.println("생성된 accessToken : " + accessToken);
        System.out.println("생성된 refreshToken : " + refreshToken);

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    //AccessToken 최초 생성 메소드
    private String generateAccessTokenInFirstTime(Authentication authentication) {
        return generateAccessTokenBy(authentication.getName(), authentication.getAuthorities());
    }

    //AccessToken 생성 메소드
    private String generateAccessTokenBy(String subject, Collection<? extends GrantedAuthority> authorities) {
        long now = (new Date()).getTime();
        Date accessTokenExpiresIn = new Date(now + 24 * 60 * 60 * 1000L);

        return Jwts.builder()
                .setSubject(subject)
                .claim("auth", authorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(",")))
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // RefreshToken을 사용하여 AccessToken 재발급 메소드
    public JwtToken refreshAccessToken(String refreshToken) {
        String newRefreshToken;
        long oneDay = 24 * 60 * 60 * 1000L;
        // 리프레시 토큰에서 클레임 추출
        Claims claims = parseClaims(refreshToken);

        // 리프레시 토큰 만료 기간 추출
        Date expirationDate = claims.getExpiration();

        Date now = new Date();

        // 만료 시간과 현재 시간을 비교하여 남은 만료 기간 계산
        long remainingTime = expirationDate.getTime() - now.getTime();

        System.out.println("remainingTime : " + remainingTime);
        // 리프레시 토큰에서 사용자 정보 및 권한 추출 -> 불가능

        if (validateToken(refreshToken).equals("Expired JWT Token") || remainingTime <= oneDay) {
            // 만료 기간이 1일 이하인 경우 리프레시 토큰도 새로 발급
            System.out.println("만료 기간이 1일 이하입니다. 새로운 리프레시 토큰을 발급합니다");
            newRefreshToken = generateRefreshToken();

        } else {
            newRefreshToken = refreshToken;
        }

        UserEntity userEntity = userRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        //accessToken은 주기적으로 갱신, 이 메소드 자체가 refresh 토큰이 존재한다는 것이니
        String newAccessToken = generateAccessTokenBy(userEntity.getUsername(), userEntity.getAuthorities());

        //쿠키 값 재지정
        createCookie(response, "accessToken", newAccessToken);
        createCookie(response, "refreshToken", newRefreshToken);

        
        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    // 새로운 RefreshToken 생성 메서드
    private String generateRefreshToken() {
        //리프레시 토큰의 기간 1주일
        long now = (new Date()).getTime();
        Date accessTokenExpiresIn = new Date(now + 7 * 24 * 60 * 60 * 1000L);

        return Jwts.builder()
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        // 토큰 복호화 [emial(이메일), auth(권한) 정보를 가져옴], calims.getSubject = email
        Claims claims = parseClaims(accessToken);
        System.out.println("getAuthentication 실행 가져온 accessToken으로 가져온 claims : "+ claims);
        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities = getAuthoritiesFromClaims(claims);


        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보를 검증하는 메서드
    public String validateToken(String token) {

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            System.out.println("validateToken true");
            return "true";
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            System.out.println("Invalid JWT Token");
            // log.info("Invalid JWT Token", e);//잘못된 토큰
            return "Invalid JWT Token";
        } catch (ExpiredJwtException e) {
            System.out.println("Expired JWT Token");
            // log.info("Expired JWT Token", e);//만료된 토큰
            return "Expired JWT Token";
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT Token");
            // log.info("Unsupported JWT Token", e);//지원하지 않는 토큰
            return "Unsupported JWT Token";
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty");
            // log.info("JWT claims string is empty.", e);//토큰이 비었음
            return "JWT claims string is empty";
        }
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    //쿠키 생성 메소드
    public void createCookie(HttpServletResponse response, String tokenName, String tokenValue) {
        // 토큰 디코드
        Claims claims = parseClaims(tokenValue);
        // 만료 시간 정보 얻기
        long expirationTime = claims.getExpiration().getTime() / 1000; // 밀리초를 초로 변환

        Cookie cookie;
        cookie = new Cookie(tokenName, URLEncoder.encode(tokenValue, StandardCharsets.UTF_8));

        // 쿠키 속성 설정
        cookie.setHttpOnly(true);  //httponly 옵션 설정
        cookie.setSecure(true); //https 옵션 설정
        cookie.setPath("/"); // 모든 곳에서 쿠키열람이 가능하도록 설정
        cookie.setMaxAge(Math.toIntExact(expirationTime)); //쿠키 만료시간 설정
        response.addCookie(cookie);
    }
}