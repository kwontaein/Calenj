package org.example.calenj.Main.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class GlobalService {

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
        LocalDateTime sevenDaysLater = now.plusDays(7);

        // 날짜 형식 지정
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        // 7일 후의 날짜와 시간 출력
        System.out.println("오늘: " + now.format(dateFormatter) + " " + now.format(timeFormatter));
        System.out.println("7일 뒤: " + sevenDaysLater.format(dateFormatter) + " " + sevenDaysLater.format(timeFormatter));

        // 오늘로부터 7일 뒤의 날짜 구하기 (시간은 무시)
        LocalDate today = LocalDate.now();
        LocalDate sevenDaysLaterDate = today.plusDays(7);

        return sevenDaysLaterDate.format(dateFormatter) + " " + sevenDaysLater.format(timeFormatter);
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

//    public String saveArrayList(List<String> transData){
//        // JSON 문자열로 변환
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            String json = objectMapper.writeValueAsString(transData);
//
//            System.out.println("ViewerDuplicateList as JSON :" + json);
//            return json;
//        } catch (JsonProcessingException e) {
//            e.getMessage();
//        }
//        //투표자 갱신
//
//    }
}
