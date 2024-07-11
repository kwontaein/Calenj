package org.example.calenj.image.service;

import org.example.calenj.global.service.GlobalService;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.websocket.dto.response.ChatMessageResponse;
import org.example.calenj.websocket.service.WebSocketService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


@Service
public class ImageService {
    private final String imageDir;
    private WebSocketService webSocketService;
    private GlobalService globalService;
    private SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    public ImageService(@Value("${image-dir}") String imageDir, WebSocketService webSocketService, GlobalService globalService, SimpMessagingTemplate template) {
        this.imageDir = imageDir;
        this.webSocketService = webSocketService;
        this.globalService = globalService;
        this.template = template;
    }


    public void saveProfileImage(UUID uuid, MultipartFile file) {
        uploadImage(uuid, file);
    }

    /**
     * 파일 형식을 확인합니다.
     *
     * @param file 전달된 파일
     */
    public boolean isValidImage(MultipartFile file) {
        // 파일 콘텐츠 유형이 이미지 유형인지 확인
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image");
    }

    /**
     * 업로드된 이미지를 서버에 저장합니다.
     *
     * @param file 파일
     */
    public void fileValid(UUID uuid, MultipartFile file) {
        try {
            // 파일 유효성 검사
            if (!isValidImage(file)) {
                // 유효하지 않은 파일 유형 처리
                return; // 다음 파일로 건너뜁니다
            }
            // 이미지를 저장하기 위한 서비스 메서드 호출
            uploadImage(uuid, file);
        } catch (Exception e) {
            // 다른 예외 처리
            e.printStackTrace(); // 예외를 로깅하는 것이 좋습니다
        }
    }

    /**
     * 업로드된 이미지를 서버에 저장합니다.
     * id로 이미지 저장
     */
    public void uploadImage(UUID uuid, MultipartFile file) {
        // 이미지 파일의 확장자 추출
        final String extension = file.getContentType().split("/")[1];
        // 이미지 파일 이름을 고유한 이름으로 생성 (UUID와 확장자 조합)

        final String imageName = uuid + "." + extension;
        try {
            // 이미지를 저장할 파일 객체 생성
            final File newfile = new File(imageDir + imageName);

            // 이미 파일이 존재하는 경우 해당 파일을 삭제합니다.

            if (newfile.exists()) {
                Files.delete(newfile.toPath());
            }

            if (!newfile.exists()) {
                newfile.mkdirs();
            }

            // 업로드된 이미지 파일을 생성한 파일 객체로 복사
            file.transferTo(newfile);
        } catch (Exception e) {
            // 이미지 저장 실패 시 예외 처리
            e.printStackTrace();
        }
    }

    /**
     * 이미지를 압축하여 지정된 파일에 저장합니다.
     *
     * @param inputFile   압축할 이미지 파일
     * @param destination 압축된 이미지를 저장할 파일 경로
     * @param quality     압축 품질 (0.1 ~ 1.0 사이의 값)
     * @throws IOException 이미지 파일을 읽거나 쓸 때 발생하는 IO 예외
     */
    public static File compressImage(File inputFile, String destination, float quality) throws IOException {
        try (InputStream is = new FileInputStream(inputFile);
             OutputStream os = new FileOutputStream(destination);
             ImageOutputStream ios = ImageIO.createImageOutputStream(os)) {

            // 이미지 파일을 읽어들입니다.
            BufferedImage image = ImageIO.read(is);

            // JPG 형식의 이미지 라이터를 가져옵니다.
            ImageWriter writer = ImageIO.getImageWritersByFormatName("jpg").next();
            writer.setOutput(ios);

            // 이미지 쓰기 매개변수를 설정합니다.
            ImageWriteParam param = writer.getDefaultWriteParam();
            param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            param.setCompressionQuality(quality);

            // 압축된 이미지를 파일에 씁니다.
            writer.write(null, new javax.imageio.IIOImage(image, null, null), param);

            // 압축된 이미지 파일을 반환합니다.
            return new File(destination);
        }
    }

    // 이미지 DB 저장
    public void saveImage(String originalFileName, byte[] imageBytes, int paramId) {
        //db에 이미지 저장
    }

    public boolean saveMultiImage(MultipartFile[] multipartFiles, String param) {
        Set<String> imageIds = new HashSet<>();
        try {
            for (MultipartFile file : multipartFiles) {
                fileValid(UUID.randomUUID(), file);
                System.out.println(file.getOriginalFilename());
                imageIds.add(UUID.randomUUID() + " / " + file.getOriginalFilename());
            }

            ChatMessageRequest chatMessageRequest = new ChatMessageRequest();
            chatMessageRequest.setState(ChatMessageRequest.fileType.SEND);
            chatMessageRequest.setUserId(globalService.myUserEntity().getUserId());
            chatMessageRequest.setSendDate(globalService.nowTime());
            chatMessageRequest.setMessage(imageIds.toString());
            chatMessageRequest.setParam(param);
            chatMessageRequest.setMessageType("image");

            ChatMessageResponse chatMessageResponse = webSocketService.filterNullFields(chatMessageRequest);
            chatMessageResponse.setTarget("groupMsg");
            chatMessageResponse.setChatUUID(webSocketService.saveChattingToFile(chatMessageRequest));

            template.convertAndSend("/topic/groupMsg/" + param, chatMessageResponse);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getAllImageById(String param) {
        List<String> lines = webSocketService.getFile(param);
        Pattern pattern = Pattern.compile("\\$ image \\$ \\[(.*)]");
        List<String> extractedParts = lines.stream()
                .filter(line -> line.contains("$ image"))
                .map(line -> {
                    Matcher matcher = pattern.matcher(line);
                    if (matcher.find()) {
                        return matcher.group(1);
                    } else {
                        return "";
                    }
                })
                .filter(extractedPart -> !extractedPart.isEmpty())
                .collect(Collectors.toList());

        extractedParts.forEach(System.out::println);
        return "";
    }
}
