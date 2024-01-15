package org.example.calenj.Main.controller;

import org.example.calenj.Main.domain.Test;
import org.example.calenj.Main.model.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8000")
public class UserController {

    @Autowired
    MainService mainService;
    @PostMapping("/login")
    public ResponseEntity<String> login(){

        return ResponseEntity.ok().body(mainService.login("",""));
    }

}
