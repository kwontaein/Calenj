package org.example.calenj.file.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FileRequest {
    private String param;
    private MultipartFile multipartFile;
    private MultipartFile[] multipartFiles;
}
