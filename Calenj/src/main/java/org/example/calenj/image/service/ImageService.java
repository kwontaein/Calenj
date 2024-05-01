package org.example.calenj.image.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.sql.SQLException;


@Service
@RequiredArgsConstructor
public class ImageService {
    public boolean isValidImage(MultipartFile file) {
        // 파일 콘텐츠 유형이 이미지 유형인지 확인
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image");
    }


    // 호텔 이미지 저장
    public void saveImage(String originalFileName, byte[] imageBytes, int paramId) {
        //db에 이미지 저장
    }

    //이미지를 압축한다.
    public static void compressAndSaveImage(File inputFile, String tableName, float quality) throws IOException, SQLException {
        try (InputStream is = new FileInputStream(inputFile)) {
            BufferedImage image = ImageIO.read(is);

            // 이미지를 압축한다.
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            // 압축된 이미지 바이트 배열을 얻는다.
            byte[] compressedImageBytes = outputStream.toByteArray();

            // 데이터베이스에 압축된 이미지를 저장한다.
        }
    }
}
