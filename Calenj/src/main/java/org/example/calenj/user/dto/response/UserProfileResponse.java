package org.example.calenj.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private String nickName;
    private String introduce;    // 소개
    private String joinDate;    // 가입일
    private List<String> sameGroup;// 같이 있는 그룹
    private List<String> sameFriend;// 함께 아는 친구
    private String chatUUID;// 개인 메세지 버튼
    private String eventContent;
    private String userName;
    private UUID userId;

}
