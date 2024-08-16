package org.example.calenj.global.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.repository.UserRepository;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.websocket.dto.response.ChatMessageResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GlobalService {

    private final UserRepository userRepository;

    /**
     * SecurityContext 에서 유저 정보 추출하는 메소드
     *
     * @return 유저 정보
     */
    public UserDetails extractFromSecurityContext() { //id , password , 권한
        // SecurityContext 에서 Authentication 객체 추출
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        // Authentication 객체에서 유저 정보 추출
        return (UserDetails) authentication.getPrincipal(); //->principal ->id , password , 권한
        // 유저 정보 사용
    }

    /**
     * 현재 날짜와 시간 가져오기
     *
     * @return 현재 날짜와 시간
     */
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

    /**
     * 7일 뒤의 날짜 구하기
     *
     * @param dateTime 전달받은 날짜
     * @param times    시간
     * @return 7일을 더한 값
     */
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

    /**
     * 날짜 비교
     *
     * @param endDate 마감일 가져와서
     * @return 오늘이 지나지 않았다면 사용 가능
     */
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

    /**
     * 리스트를 json형식 문자열로 변환
     *
     * @param transData 바꿀 목록
     * @return json
     */
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

    /**
     * 내 유저 상세 정보 조회
     *
     * @return 내 정보
     */
    /*public UserEntity myUserEntity() {
        UUID myUserID = UUID.fromString(extractFromSecurityContext().getUsername());
        UserEntity userEntity = userRepository.findByUserId(myUserID).orElseThrow(() -> new RuntimeException("유저 정보가 없습니다"));
        return userEntity;
    }
*/

    /**
     * 유저 정보 조회
     *
     * @param userId 조회할 유저 아이디(null일 경우 내 아이디)
     * @return 유저 정보
     */
    public UserEntity getUserEntity(@Nullable UUID userId) {
        if (userId == null) {
            userId = UUID.fromString(extractFromSecurityContext().getUsername());
        }
        UserEntity userEntity = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("유저 정보가 없습니다"));
        return userEntity;
    }


    /**
     * response 설정
     *
     * @param request 전달받은 정보들
     **/

    // null이 아닌 필드만 포함시키는 메소드
    public ChatMessageResponse filterNullFields(ChatMessageRequest request) {
        ChatMessageResponse filteredResponse = new ChatMessageResponse();
        if (request.getParam() != null) {
            filteredResponse.setParam(request.getParam());
        }
        if (request.getUserId() != null) {
            filteredResponse.setUserId(request.getUserId());
        }
        filteredResponse.setState(request.getState());
        filteredResponse.setEndPoint(request.getEndPoint());
        // 필요한 필드들을 추가로 확인하여 null이 아닌 것만 설정
        return filteredResponse;
    }

}
