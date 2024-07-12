package org.example.calenj.file.dto.response;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FileResponse {
    private String usedId;
    private MultipartFile multipartFile;
    private MultipartFile[] multipartFiles;
}
