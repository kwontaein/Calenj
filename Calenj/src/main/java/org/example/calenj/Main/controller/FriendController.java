package org.example.calenj.Main.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.EventDTO;
import org.example.calenj.Main.DTO.FriendDTO;
import org.example.calenj.Main.model.FriendService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @PostMapping("/api/getFriendList")
    public List<FriendDTO> friendList() {
        List<FriendDTO> a = friendService.friendList();
        System.out.println(a);
        return friendService.friendList();
    }

    @PostMapping("/api/requestFriend")
    public void requestFriend(@RequestParam(name = "otherUserId") String otherUserId) {
        //친구 요청 보내기
        //만약 상대가 보낸 요청이 있다면, 내 테이블에 추가 후 상태 변경하기
        friendService.requestFriend(otherUserId);
    }

    @PostMapping("/api/responseFriend")
    public void responseFriend(@RequestParam(name = "requestUserId") String requestUserId, @RequestParam(name = "isAccept") String isAccept) {
        //친구 요청 응답
        //승인인지 거절인지 받아서 전달
        friendService.responseFriend(requestUserId, isAccept);
    }

    @PostMapping("/api/myEvents")
    public List<EventDTO> myEvents(@RequestParam(name = "userId") String userId) {
        //친구 요청 응답
        //승인인지 거절인지 받아서 전달
        List<EventDTO> events = friendService.myEvents(userId);
        System.out.println(events.toString());
        return events;
    }

    //내가 보낸 요청 목록
    @PostMapping("/api/RequestFriendList")
    public List<EventDTO> RequestFriendList() {
        return friendService.RequestFriendList();
    }

    //내가 받은 요청 목록
    @PostMapping("/api/ResponseFriendList")
    public List<EventDTO> ResponseFriendList() {
        System.out.println(friendService.ResponseFriendList());
        return friendService.ResponseFriendList();
    }

}
