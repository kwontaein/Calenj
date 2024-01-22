package org.example.calenj.Main.controller;

import org.example.calenj.Main.DTO.GroupDTO;
import org.example.calenj.Main.model.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GroupController {

    @Autowired
    GroupService groupService;

    @PostMapping("/api/makeGroup")
    public String makeGroup(@RequestBody GroupDTO groupDTO) {
        String a = groupService.makeGroup(groupDTO.getGroup_title(), groupDTO.getGroup_created());
        return a;
    }
}
