package org.example.calenj.image.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.image.dto.ImageRequest;
import org.example.calenj.image.service.ImageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public void profileUpdate(@RequestBody ImageRequest imageRequest) {
        imageService.saveMultiImage(imageRequest.getMultipartFiles(), imageRequest.getParam());
    }
}
