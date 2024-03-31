package org.example.calenj.Main.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.model.FriendService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @PostMapping("/api/friendList")
    public void friendList(@RequestParam(name = "userId") String userId) {
        //친구목록 불러오기
        friendService.friendList(userId);
    }

    @PostMapping("/api/requestFriend")
    public void requestFriend(@RequestParam(name = "userId") String userId) {
        //친구 요청 보내기
        //만약 상대가 보낸 요청이 있다면, 내 테이블에 추가 후 상태 변경하기
        friendService.requestFriend(userId);
    }
}
