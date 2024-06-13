package org.example.calenj.global.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GlobalService {

    private final UserRepository userRepository;

    //SecurityContext 에서 유저 정보 추출하는 메소드
    public UserDetails extractFromSecurityContext() { //id , password , 권한
        // SecurityContext 에서 Authentication 객체 추출
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        // Authentication 객체에서 유저 정보 추출
        return (UserDetails) authentication.getPrincipal(); //->principal ->id , password , 권한
        // 유저 정보 사용
    }

    public String nowTime() {
        // 현재 날짜와 시간 가져오기
        LocalDateTime now = LocalDateTime.now();

        // 7일을 더한 날짜와 시간 구하기
        //plusDate(now, 7);

        // 날짜 형식 지정
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        //System.out.println("오늘: " + now.format(dateFormatter) + " " + now.format(timeFormatter));

        return now.format(dateFormatter) + " " + now.format(timeFormatter);
    }

    public String plusDate(LocalDateTime dateTime, int times) {
        // 현재 날짜와 시간 가져오기
        // 7일을 더한 날짜와 시간 구하기
        LocalDateTime sevenDaysLater = dateTime.plusDays(times);

        // 날짜 형식 지정
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        // 7일 후의 날짜와 시간 출력
        // System.out.println("오늘: " + dateTime.format(dateFormatter) + " " + dateTime.format(timeFormatter));
        // System.out.println("7일 뒤: " + sevenDaysLater.format(dateFormatter) + " " + sevenDaysLater.format(timeFormatter));

        return sevenDaysLater.format(dateFormatter) + " " + sevenDaysLater.format(timeFormatter);
    }

    public String compareDate(String endDate) {
        // 오늘 날짜와 시간 가져오기
        LocalDateTime now = LocalDateTime.now();

        // 문자열을 LocalDateTime으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime storedDateTime = LocalDateTime.parse(endDate, formatter);
        // 비교
        int comparison = now.compareTo(storedDateTime);
        System.out.println("comparison: " + comparison);
        // 결과 출력
        if (comparison <= 0) {
            return ("useAble");
        } else {
            return ("cannotUse");
        }
    }

    public String saveArrayList(List<String> transData) {
        // JSON 문자열로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String json = objectMapper.writeValueAsString(transData);

            System.out.println("ViewerDuplicateList as JSON :" + json);
            return json;
        } catch (JsonProcessingException e) {
            return e.getMessage();
        }
    }

    public void createCookie(HttpServletResponse response, String tokenName, String tokenValue) {

        // 만료 시간 정보 얻기
        Cookie cookie;
        cookie = new Cookie(tokenName, URLEncoder.encode(tokenValue, StandardCharsets.UTF_8));

        // 쿠키 속성 설정
        cookie.setHttpOnly(true);  //httponly 옵션 설정
        cookie.setSecure(true); //https 옵션 설정
        cookie.setPath("/"); // 모든 곳에서 쿠키열람이 가능하도록 설정
        cookie.setMaxAge(24 * 60 * 60 * 1000); //쿠키 만료시간 설정
        response.addCookie(cookie);
    }

    public UserEntity myUserEntity() {
        UUID myUserID = UUID.fromString(extractFromSecurityContext().getUsername());
        UserEntity userEntity = userRepository.findByUserId(myUserID).orElseThrow(() -> new RuntimeException());
        return userEntity;
    }

}
