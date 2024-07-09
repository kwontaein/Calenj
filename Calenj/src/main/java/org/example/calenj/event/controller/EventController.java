package org.example.calenj.event.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.event.dto.response.EventResponse;
import org.example.calenj.event.service.EventService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    /**
     * 내가 요청한 목록
     */
    @GetMapping("/api/myRequestList")
    public List<EventResponse> RequestFriendList() {
        return eventService.RequestFriendList();
    }

    /**
     * 요청 받은 목록
     */
    @GetMapping("/api/requestedList")
    public List<EventResponse> ResponseFriendList() {
        return eventService.ResponseFriendList();
    }

}
