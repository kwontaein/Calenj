package org.example.calenj.Main.model;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.FriendDTO;
import org.example.calenj.Main.Repository.FriendRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;

    public void requestFriend(String userId) {
        //친구테이블 추가
        //이벤트테이블추가
        //요청한 친구에게 알림 보내기
    }

    public List<FriendDTO> friendList(String userId) {
        return friendRepository.findFriendListbyId(userId).orElseThrow(() -> new RuntimeException("친구 목록을 불러오는데 실패했습니다."));

    }
}
