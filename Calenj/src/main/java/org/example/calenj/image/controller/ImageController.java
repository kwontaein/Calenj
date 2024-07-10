package org.example.calenj.image.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.image.dto.ImageRequest;
import org.example.calenj.image.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;
    private final GlobalService globalService;

    @PostMapping("/api/userProfileUpload")
    public void userProfileUpload(@RequestBody ImageRequest imageRequest) {
        if (imageRequest.getMultipartFile() != null) {
            imageService.fileValid(UUID.fromString(globalService.extractFromSecurityContext().getUsername()), imageRequest.getMultipartFile());
        }
    }

    @PostMapping("/api/imageUpload")
    public ResponseEntity<String> profileUpdate(@RequestParam("files") MultipartFile[] files, @RequestParam(name = "param", required = false) String id) {
        try {
            boolean success = imageService.saveMultiImage(files, id);
            if (success) {
                return ResponseEntity.ok("Success");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save images");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
