package org.example.calenj.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private String introduce;    // 소개
    private String joinDate;    // 가입일
    private List<String> sameGroup;// 같이 있는 그룹
    private String chatUUID;// 개인 메세지 버튼
}
