package org.example.calenj.global.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * 이메일 인증 정보 Redis 저장
     *
     * @param email            이메일
     * @param verificationCode 인증번호
     */
    public void saveVerificationCode(String email, String verificationCode) {
        HashOperations<String, Object, Object> hashOps = redisTemplate.opsForHash();
        Map<String, Object> verificationData = new HashMap<>();

        // 기존에 저장된 데이터가 있는지 확인
        boolean exists = hashOps.hasKey("verify:" + email, "code");

        // 인증번호와 카운트 업데이트
        verificationData.put("code", verificationCode);
        int newCount = 1;  // 기본 카운트 값을 1로 설정

        if (exists) {
            // 기존 카운트 값을 가져와서 1 증가
            Integer currentCount = (Integer) hashOps.get("verify:" + email, "count");
            newCount = (currentCount != null ? currentCount + 1 : 1);
            verificationData.put("count", String.valueOf(newCount));
        } else {
            // 새로운 인증번호에 대한 카운트는 1로 설정
            verificationData.put("count", String.valueOf(newCount));
        }

        // 데이터 저장
        hashOps.putAll("verify:" + email, verificationData);

        // 인증번호의 만료 시간 설정
        // 카운트가 5 이상일 경우 30분. 아니면 5분.
        int expirationMinutes = newCount >= 5 ? 30 : 5;

        redisTemplate.expire("verify:" + email, Duration.ofMinutes(expirationMinutes));
    }

    /**
     * 이메일 인증 정보 Redis 에서 읽어오기
     *
     * @param email 이메일
     */
    public Map<Object, Object> getVerificationData(String email) {
        HashOperations<String, Object, Object> hashOps = redisTemplate.opsForHash();
        return hashOps.entries("verify:" + email);
    }

    public long getRemainingTTL(String key) {
        Duration duration = Duration.ofDays(redisTemplate.getExpire(key));
        return duration != null ? duration.getSeconds() : -2;  // Duration이 null인 경우는 키가 존재하지 않을 때
    }

    /**
     * 유저 토큰 저장
     */
    public void saveUserToken(String userId, String token) {
        HashOperations<String, Object, Object> hashOps = redisTemplate.opsForHash();
        Map<String, Object> userTokenMap = new HashMap<>();
        userTokenMap.put("token", token);
        hashOps.putAll("user:" + userId, userTokenMap);
    }

    /**
     * 유저 토큰 조회
     */
    public String getUserToken(String userId) {
        HashOperations<String, Object, Object> hashOps = redisTemplate.opsForHash();
        Map<Object, Object> userTokenMap = hashOps.entries("user:" + userId);
        return (String) userTokenMap.get("token");
    }


}