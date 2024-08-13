package org.example.calenj.friend.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.friend.dto.request.FriendRequest;
import org.example.calenj.friend.dto.response.AddFriendResponse;
import org.example.calenj.friend.dto.response.FriendResponse;
import org.example.calenj.friend.service.FriendService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    /**
     * 친구 목록 가져오기.
     */
    @GetMapping("/api/getFriendList")
    public List<FriendResponse> friendList() {
        return friendService.friendList();
    }

    /**
     * 친구 요청하기
     */
    @PostMapping("/api/requestFriend")
    public AddFriendResponse requestFriend(@RequestBody FriendRequest request) {
        //친구 요청 보내기
        //만약 상대가 보낸 요청이 있다면, 내 테이블에 추가 후 상태 변경하기
        return friendService.requestFriend(request.getFriendUserId());
    }

    /**
     * 친구 요청에 응답하기
     */
    @PostMapping("/api/myResponse")
    public AddFriendResponse responseFriend(@RequestBody FriendRequest request) {
        //친구 요청 응답
        //승인인지 거절인지 받아서 전달
        return friendService.responseFriend(UUID.fromString(request.getFriendUserId()), request.getIsAccept());
    }

    /**
     * 친구 삭제 + 차단
     *
     * @param request
     */
    @PostMapping("/api/deleteFriend")
    public void deleteFriend(@RequestBody FriendRequest request) {
        friendService.deleteFriend(request);
    }


    @GetMapping("/api/getBanList")
    public List<FriendResponse> getBanList() {
        return friendService.banList();
    }

    /**
     * 요청 정보 저장
     */
    @PostMapping("/api/saveRequest")
    public void saveRequest(@RequestBody FriendRequest friendRequest) {
        friendService.saveFriend(friendRequest.getUserName(), friendRequest.getEventContent());
    }

}
