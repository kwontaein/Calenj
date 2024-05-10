package org.example.calenj.image.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImageRequest {
    private String usedId;
    private MultipartFile multipartFile;
    private MultipartFile[] multipartFiles;
}
