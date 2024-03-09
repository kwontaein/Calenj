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

    private final ChatRoomRepository repository;

    //채팅방 목록 조회
    @GetMapping(value = "/rooms")
    public void rooms() {

        log.info("# All Chat Rooms");

        System.out.println("rooms: " + repository.findAllRooms());
    }

    //채팅방 개설
    @PostMapping(value = "/room")
    public void create(@RequestParam String name) {

        log.info("# Create Chat Room , name: " + name);
        System.out.println("roomName : " + repository.createChatRoomDTO(name));
    }

    //채팅방 조회
    @GetMapping("/room")
    public void getRoom(String roomId) {

        log.info("# get Chat Room, roomID : " + roomId);
        //채팅방 찾기
        System.out.println("room : " + repository.findRoomById(roomId));
    }
}
