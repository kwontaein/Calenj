package org.example.calenj.Main.JWT;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
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

        // Refresh Token 생성 -> DB에 저장
        System.out.println("생성된 accessToken : " + accessToken);

        System.out.println("생성된 refreshToken : " + refreshToken);

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    //AccessToken 재발급 메소드
    private String generateAccessTokenByRefreshToken(UserDetails userDetails) {
        return generateAccessTokenBy(userDetails.getUsername(), userDetails.getAuthorities());
    }

    //AccessToken 최초 생성 메소드
    private String generateAccessTokenInFirstTime(Authentication authentication) {
        return generateAccessTokenBy(authentication.getName(), authentication.getAuthorities());
    }

    //AccessToken 생성 메소드
    private String generateAccessTokenBy(String subject, Collection<? extends GrantedAuthority> authorities) {
        long now = (new Date()).getTime();
        Date accessTokenExpiresIn = new Date(now + 86400000);

        return Jwts.builder()
                .setSubject(subject)
                .claim("auth", authorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(",")))
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 새로운 리프레시 토큰 생성을 위한 도우미 메서드
    private String generateRefreshToken() {
        //리프레시 토큰의 기간 1주일
        long now = (new Date()).getTime();
        long oneWeekInMillis = 7 * 24 * 60 * 60 * 1000L;
        Date accessTokenExpiresIn = new Date(now + oneWeekInMillis);

        return Jwts.builder()
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 리프레시 토큰을 사용하여 새로운 액세스 토큰 생성
    public String refreshAccessToken(String refreshToken) {

        long oneDayInMillis = 24 * 60 * 60 * 1000L;

        String newRefreshToken;

        // 리프레시 토큰에서 클레임 추출
        Claims claims = parseClaims(refreshToken);
        // 리프레시 토큰 만료 기간 추출
        Date expirationDate = claims.getExpiration();
        Date now = new Date();
        // 만료 시간과 현재 시간을 비교하여 남은 만료 기간 계산
        long remainingTime = expirationDate.getTime() - now.getTime();

        System.out.println("remainingTime : " + remainingTime);
        // 리프레시 토큰에서 사용자 정보 및 권한 추출 -> 불가능

        UserEntity userEntity = userRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        UserDetails userDetails = new User(userEntity.getUsername(), "", userEntity.getAuthorities());

        // 1일 이하인 경우에 대한 조건 추가 -- 리프레시 토큰 재발급 부분인데, 수정 필요
        if (remainingTime <= oneDayInMillis) {
            // 만료 기간이 1일 이하인 경우 리프레시 토큰도 새로 발급
            System.out.println("만료 기간이 1일 이하입니다. 새로운 리프레시 토큰을 발급합니다");
            newRefreshToken = generateRefreshToken();
        } else {
            newRefreshToken = refreshToken;
        }

        return generateAccessTokenByRefreshToken(userDetails);

    }

    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = parseClaims(accessToken);

        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities = getAuthoritiesFromClaims(claims);

        System.out.println("authorities : " + authorities);

        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    // 토큰 정보를 검증하는 메서드
    public String validateToken(String token) {

        System.out.println("validateToken 실행: ");
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return "true";
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            // log.info("Invalid JWT Token", e);//잘못된 토큰
            return "Invalid JWT Token";
        } catch (ExpiredJwtException e) {
            // log.info("Expired JWT Token", e);//만료된 토큰
            return "Expired JWT Token";
        } catch (UnsupportedJwtException e) {
            // log.info("Unsupported JWT Token", e);//지원하지 않는 토큰
            return "Unsupported JWT Token";
        } catch (IllegalArgumentException e) {
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
}