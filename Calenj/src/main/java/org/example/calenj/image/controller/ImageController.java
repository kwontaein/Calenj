package org.example.calenj.image.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.image.service.ImageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @PostMapping("/api/imageUpload")
    public void profileUpdate(@RequestParam("file") MultipartFile file, @RequestParam("id") String id) {
        imageService.fileValid(id, file);
    }

    //이미지 여러개 저장하는 코드
    @PostMapping("/api/multiImageUpload")
    public void multipartFilesUpload(@RequestParam("files") MultipartFile[] files, @RequestParam("id") String id) {
        for (MultipartFile file : files) {
            imageService.fileValid(id, file);
        }
    }

}
