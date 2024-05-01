package org.example.calenj.image.controller;

import lombok.RequiredArgsConstructor;
import org.example.calenj.image.service.ImageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @PostMapping("/api/")
    public void profileUpdate(@RequestParam("article_file") MultipartFile file) {
        try {
            // 파일 유효성 검사
            if (!!imageService.isValidImage(file)) {
                return;
            }
            // 파일 크기 유효성 검사
           /*if (file.getSize() > MAX_FILE_SIZE) {
                return;
            }*/
            byte[] imageBytes = file.getBytes();
            String originalFileName = file.getOriginalFilename();
            // 데이터베이스에 이미지를 저장하기 위한 서비스 메서드 호출
            imageService.saveImage(originalFileName, imageBytes, 1);
        } catch (IOException e) {
            // IO 예외 처리
            e.printStackTrace(); // 예외를 로깅하는 것이 좋습니다
        } catch (Exception e) {
            // 다른 예외 처리
            e.printStackTrace(); // 예외를 로깅하는 것이 좋습니다
        }
    }

    //이미지 여러개 저장하는 코드
    @PostMapping("/api/")
    public void multipartFilesUpload(@RequestParam("article_file") MultipartFile[] multipartFiles) {
        for (MultipartFile file : multipartFiles) {
            try {
                // 파일 유효성 검사
                if (!imageService.isValidImage(file)) {
                    // 유효하지 않은 파일 유형 처리
                    continue; // 다음 파일로 건너뜁니다
                }

                // 파일 크기 유효성 검사
              /* if (file.getSize() > MAX_FILE_SIZE) {
                    // 파일 크기 제한 초과 처리
                    continue; // 다음 파일로 건너뜁니다
                }*/

                byte[] imageBytes = file.getBytes();
                String originalFileName = file.getOriginalFilename();
                // 데이터베이스에 이미지를 저장하기 위한 서비스 메서드 호출
                imageService.saveImage(originalFileName, imageBytes, 1);
            } catch (IOException e) {
                // IO 예외 처리
                e.printStackTrace(); // 예외를 로깅하는 것이 좋습니다
                break; // 예외가 발생하면 루프를 종료합니다
            } catch (Exception e) {
                // 다른 예외 처리
                e.printStackTrace(); // 예외를 로깅하는 것이 좋습니다
                break; // 예외가 발생하면 루프를 종료합니다
            }
        }
    }


}
