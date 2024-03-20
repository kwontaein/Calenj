package org.example.calenj.Main.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.example.calenj.Main.Repository.ChatRoomRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/chat")
@Log4j2
public class RoomController {
    private final ChatRoomRepository chatRoomRepository;

    //채팅방 목록 = 그룹 목록 조회 -> 그룹조회 있으니 무쓸모
    @GetMapping(value = "/rooms")
    public void rooms() {
        log.info("# All Chat Rooms");
        chatRoomRepository.findAllRooms();
    }

    //채팅방 개설 -> 그룹 생성 시 자동 생성 -> 역시 무쓸모
    @PostMapping(value = "/room")
    public void create(@RequestParam String name) {
        chatRoomRepository.createChatRoomDTO(name);
    }

    //채팅방 조회 -> 얘도 ㅅㅂ 무쓸모같은데
    @GetMapping("/room")
    public void getRoom(String roomId) {
        log.info("# get Chat Room, roomID : " + roomId);
        chatRoomRepository.findRoomById(roomId);
    }
}
