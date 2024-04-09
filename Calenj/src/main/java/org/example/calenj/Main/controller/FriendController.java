package org.example.calenj.Main.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.User.EventDTO;
import org.example.calenj.Main.DTO.User.FriendDTO;
import org.example.calenj.Main.Service.FriendService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @GetMapping("/api/getFriendList")
    public List<FriendDTO.Response> friendList() {
        List<FriendDTO.Response> a = friendService.friendList();
        System.out.println(a);
        return friendService.friendList();
    }

    @PostMapping("/api/requestFriend")
    public void requestFriend(@RequestBody FriendDTO.Request request) {
        //친구 요청 보내기
        //만약 상대가 보낸 요청이 있다면, 내 테이블에 추가 후 상태 변경하기
        friendService.requestFriend(request.getFriendUserId());
    }

    @PostMapping("/api/responseFriend")
    public void responseFriend(@RequestBody FriendDTO.Request request) {
        //친구 요청 응답
        //승인인지 거절인지 받아서 전달
        friendService.responseFriend(request.getFriendUserId(), request.getIsAccept());
    }

    @PostMapping("/api/myEvents")
    public List<EventDTO.Response> myEvents(@RequestBody FriendDTO.Request request) {
        //친구 요청 응답
        //승인인지 거절인지 받아서 전달
        List<EventDTO.Response> events = friendService.myEvents(request.getUserId());
        System.out.println(events.toString());
        return events;
    }

    //내가 보낸 요청 목록
    @GetMapping("/api/RequestFriendList")
    public List<EventDTO.Response> RequestFriendList() {
        return friendService.RequestFriendList();
    }

    //내가 받은 요청 목록
    @GetMapping("/api/ResponseFriendList")
    public List<EventDTO.Response> ResponseFriendList() {
        System.out.println(friendService.ResponseFriendList());
        return friendService.ResponseFriendList();
    }

}
