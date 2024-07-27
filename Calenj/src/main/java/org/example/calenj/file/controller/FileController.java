package org.example.calenj.file.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.file.dto.request.ChatFileRequest;
import org.example.calenj.file.service.FileService;
import org.example.calenj.websocket.dto.response.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @PostMapping("/api/getChattingFile")
    public List<MessageResponse> getChattingFile(@RequestBody ChatFileRequest chatFileRequest) {
        if (chatFileRequest.getNewOrOld() == null) {
            return fileService.readGroupChattingFile(chatFileRequest);
        }
        return fileService.readGroupChattingFileSlide(chatFileRequest);
    }

    @PostMapping("/api/ReloadChattingFile")
    public List<MessageResponse> ReloadChattingFile(@RequestBody ChatFileRequest chatFileRequest) {
        return fileService.readGroupChattingFileSlide(chatFileRequest);
    }

    @PostMapping("/api/userProfileUpload")
    public void userProfileUpload(@RequestParam("file") MultipartFile file, @RequestParam(name = "param") String id) {
        fileService.fileValid(UUID.fromString(id), file);
    }

    @PostMapping("/api/imageUpload")
    public ResponseEntity<String> profileUpdate(@RequestParam("groupId") String groupId, @RequestParam("files") MultipartFile[] files, @RequestParam(name = "param", required = false) String id) {
        System.out.println(files.toString());
        try {
            boolean success = fileService.saveMultiImage(files, groupId);
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
