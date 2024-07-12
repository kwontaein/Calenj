package org.example.calenj.file.service;

import org.example.calenj.file.dto.request.ChatFileRequest;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.websocket.dto.response.ChatMessageResponse;
import org.example.calenj.websocket.dto.response.MessageResponse;
import org.example.calenj.websocket.service.WebSocketService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;


@Service
public class FileService {
    private final String imageDir;
    private WebSocketService webSocketService;
    private GlobalService globalService;
    private SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    public FileService(@Value("${image-dir}") String imageDir, WebSocketService webSocketService, GlobalService globalService, SimpMessagingTemplate template) {
        this.imageDir = imageDir;
        this.webSocketService = webSocketService;
        this.globalService = globalService;
        this.template = template;
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

    public boolean saveMultiImage(MultipartFile[] multipartFiles, String param) {
        Set<String> imageIds = new HashSet<>();
        try {
            for (MultipartFile file : multipartFiles) {
                UUID uuid = UUID.randomUUID();
                fileValid(uuid, file);
                System.out.println(file.getOriginalFilename());
                imageIds.add("[[" + uuid + "],[" + file.getOriginalFilename() + "]]");
            }

            UUID uuid = UUID.randomUUID();
            ChatMessageRequest chatMessageRequest = new ChatMessageRequest();
            chatMessageRequest.setState(ChatMessageRequest.fileType.SEND);
            chatMessageRequest.setUserId(globalService.myUserEntity().getUserId());
            chatMessageRequest.setSendDate(globalService.nowTime());
            chatMessageRequest.setMessage(imageIds.toString());
            chatMessageRequest.setParam(param);
            chatMessageRequest.setMessageType("file");
            chatMessageRequest.setChatUUID(uuid);

            webSocketService.saveChattingToFile(chatMessageRequest);

            MessageResponse messageResponse = new MessageResponse(
                    chatMessageRequest.getChatUUID().toString(),
                    chatMessageRequest.getSendDate(),
                    chatMessageRequest.getUserId().toString(),
                    chatMessageRequest.getMessageType(),
                    chatMessageRequest.getMessage());

            ChatMessageResponse chatMessageResponse = webSocketService.filterNullFields(chatMessageRequest);
            chatMessageResponse.setMessage(Collections.singletonList(messageResponse));
            chatMessageResponse.setTarget("groupMsg");
            template.convertAndSend("/topic/groupMsg/" + param, chatMessageResponse);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    //------------------------------------------------------------------

    /**
     * 파일 받아오기
     *
     * @param param 받아올 파일아이디
     **/
    public List<String> getFile(String param) {
        String uuid = param;
        String filePath = "C:\\chat\\chat" + uuid;
        List<String> lines;
        try {
            lines = Files.readAllLines(Paths.get(filePath), Charset.defaultCharset());
            return lines;
        } catch (IOException e) {
            return null;
        }
    }


    /**
     * 처음 파일 내용 읽어오기
     **/
    public List<MessageResponse> readGroupChattingFile(ChatFileRequest chatFileRequest) {
        List<String> lines = getFile(chatFileRequest.getParam());
        if (lines == null) {
            return null;
        }

        Collections.reverse(lines); // 파일 내용을 역순으로 정렬
        List<String> previousLines = lines.stream()
                .takeWhile(line -> !line.contains(chatFileRequest.getUserId() + "EndPoint" + " [" + chatFileRequest.getParam() + "]") && !line.contains("시작라인$어서오세요$$$"))
                .filter(createFilterCondition(chatFileRequest.getParam()))
                .map(stringTransformer)
                .collect(Collectors.toList());

        int startIndex = previousLines.size();

        if (startIndex != 0) {
            previousLines.add("엔드포인트$" + "[" + globalService.nowTime() + "] $ readPoint" + " $ readPoint" +
                    " $ " + "-----------------새로운 메세지-----------------");
        }

        // 내 엔드포인트가 최하단에 있을 경우엔 그냥 채팅 내용 불러오기 + 엔드포인트부터 위에 20개 불러오기
        List<String> previousLines2 = lines.stream()
                .filter(createFilterCondition(chatFileRequest.getParam()))
                .skip(startIndex)
                .limit(20)
                .map(stringTransformer)
                .toList();

        previousLines.addAll(previousLines2);
        Collections.reverse(previousLines);

        List<MessageResponse> messageResponses = previousLines.stream()
                .map(FileService::parseLineToChatMessage)
                .collect(Collectors.toList());

        if (messageResponses.isEmpty()) {
            return null;
        }
        return messageResponses;
    }

    public static MessageResponse parseLineToChatMessage(String line) {
        String[] parts = line.split("\\$");
        if (parts.length != 5) {
            throw new IllegalArgumentException("라인 형식이 잘못되었습니다: " + line);
        }
        String chatId = parts[0].replace("[", "").replace("]", "").trim();
        String date = parts[1].replace("[", "").replace("]", "").trim();
        String userId = parts[2].replace("[", "").replace("]", "").trim();
        String messageType = parts[3].replace("[", "").replace("]", "").trim();
        String messageContent = parts[4].replace("[", "").replace("]", "").trim();

        return new MessageResponse(chatId, date, userId, messageType, messageContent);
    }

    /**
     * 추가 파일 내용 읽어오기
     **/
    public List<MessageResponse> readGroupChattingFileSlide(ChatFileRequest chatFileRequest) {

        List<String> lines = getFile(chatFileRequest.getParam());
        Collections.reverse(lines);
        int batchSize = 20;
        //위로 아래로인지 구분
        //라인 갯수만큼 스킵하거나, 전달받은 마지막 라인부터 시작
        List<String> previousLines;

        if (chatFileRequest.getNewOrOld().equals("older")) {
            previousLines = lines.stream()
                    .map(line -> new AbstractMap.SimpleEntry<>(line, lines.indexOf(line)))
                    .dropWhile(entry -> !entry.getKey().contains(chatFileRequest.getChatId()))
                    .skip(1)
                    .map(AbstractMap.SimpleEntry::getKey)
                    .filter(createFilterCondition(chatFileRequest.getParam()))
                    .map(stringTransformer)
                    .limit(batchSize)
                    .collect(Collectors.toList());
        } else {
            List<String> previousContents = lines.stream()
                    .takeWhile(line -> !line.contains(chatFileRequest.getChatId()))
                    .filter(createFilterCondition(chatFileRequest.getParam()))
                    .map(stringTransformer)
                    .collect(Collectors.toList());

            Collections.reverse(previousContents);
            previousLines = previousContents.stream()
                    .limit(20)
                    .collect(Collectors.toList());
            Collections.reverse(previousLines);
        }

        Collections.reverse(previousLines);

        List<MessageResponse> messageResponses = previousLines.stream()
                .map(FileService::parseLineToChatMessage)
                .collect(Collectors.toList());

        if (messageResponses.isEmpty()) {
            System.out.println("값이 없다");
            return null;
        }

        return messageResponses;
    }


    /**
     * 개인 토픽 관련 메세지 (알림 등)
     *
     * @param param 멈출 내용
     **/
    public static Predicate<String> createFilterCondition(String param) {
        return line -> !line.contains("EndPoint" + " [" + param + "]");
    }

    /**
     * 내용 변경하는 람다
     **/
    public static Function<String, String> stringTransformer = str -> {
        str = str.replaceAll("\\[\\]", "");
        return str;
    };
}
