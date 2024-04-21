package org.example.calenj.Main.controller.User;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Request.User.FriendRequest;
import org.example.calenj.Main.DTO.Response.User.EventResponse;
import org.example.calenj.Main.DTO.Response.User.FriendResponse;
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
    public List<FriendResponse> friendList() {
        return friendService.friendList();
    }

    @PostMapping("/api/requestFriend")
    public String requestFriend(@RequestBody FriendRequest request) {
        //친구 요청 보내기
        //만약 상대가 보낸 요청이 있다면, 내 테이블에 추가 후 상태 변경하기
        return friendService.requestFriend(request.getFriendUserId());
    }

    @PostMapping("/api/responseFriend")
    public String responseFriend(@RequestBody FriendRequest request) {
        //친구 요청 응답
        //승인인지 거절인지 받아서 전달
        return friendService.responseFriend(request.getFriendUserId(), request.getIsAccept());
    }

    @PostMapping("/api/myEvents")
    public List<EventResponse> myEvents(@RequestBody FriendRequest request) {
        //친구 요청 응답
        //승인인지 거절인지 받아서 전달
        List<EventResponse> events = friendService.myEvents(request.getUserId());
        System.out.println(events.toString());
        return friendService.myEvents(request.getUserId());
    }

    //내가 보낸 요청 목록
    @GetMapping("/api/RequestFriendList")
    public List<EventResponse> RequestFriendList() {
        return friendService.RequestFriendList();
    }

    //내가 받은 요청 목록
    @GetMapping("/api/ResponseFriendList")
    public List<EventResponse> ResponseFriendList() {
        System.out.println(friendService.ResponseFriendList());
        return friendService.ResponseFriendList();
    }

}
