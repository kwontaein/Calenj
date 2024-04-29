package org.example.calenj.websocket.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.websocket.dto.request.AlarmRequest;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.user.repository.UserRepository;
import org.example.calenj.user.domain.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WebSokcetService {

    private final UserRepository userRepository;

    public String returnNickname(Authentication authentication) {
        UserEntity userEntity = userRepository.findByUserEmail(authentication.getName()).orElseThrow(() -> new RuntimeException("존재하지 않는 정보"));
        return userEntity.getNickname();
    }

    public String returnEmail(String nickName) {
        UserEntity userEntity = userRepository.findByNickname(nickName).orElseThrow(() -> new RuntimeException("존재하지 않는 정보"));
        return userEntity.getUserEmail();
    }

    public List<String> getFile(ChatMessageRequest message) {
        String uuid = message.getParam();
        String filePath = "C:\\chat\\chat" + uuid;
        List<String> lines;
        try {
            lines = Files.readAllLines(Paths.get(filePath), Charset.defaultCharset());
            return lines;
        } catch (IOException e) {
            return null;
        }
    }

    public void saveChattingToFile(ChatMessageRequest message) {
        // 파일을 저장한다.
        // 메시지 내용
        List<String> lines = getFile(message);

        if (lines == null) {
            return;
        }
        UUID messageUUid = message.getState() == ChatMessageRequest.fileType.SEND ? UUID.randomUUID() : UUID.fromString(message.getParam());
        String messageContent = message.getState() == ChatMessageRequest.fileType.SEND ?
                "[" + messageUUid + "] $" + "[" + message.getSendDate() + "] $" + message.getUserEmail() + " $ " +
                        message.getNickName() + " $ " + message.getMessage().replace("\n", "\\lineChange") + "\n" :
                message.getUserEmail() + "EndPoint" + " [" + messageUUid + "]" + "\n";

//        message.setMessage(messageContent);
        try (FileOutputStream stream = new FileOutputStream("C:\\chat\\chat" + message.getParam(), true)) {
            if (lines == null) {
                String Title = "캘린룸의 시작 지점이에요! $어서오세요! \n";
                stream.write(Title.getBytes(StandardCharsets.UTF_8));
            }
            stream.write(messageContent.getBytes(StandardCharsets.UTF_8));
            message.setChatUUID(messageUUid);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<String> readGroupChattingFile(ChatMessageRequest message) {
        List<String> lines = getFile(message);

        if (lines == null) {
            return null;
        }

        Collections.reverse(lines); // 파일 내용을 역순으로 정렬
        List<String> previousLines = lines.stream()
                .takeWhile(line -> !line.contains(message.getUserEmail() + "EndPoint" + " [" + message.getParam() + "]"))
                .filter(createFilterCondition(message.getParam()))
                .map(stringTransformer)
                .collect(Collectors.toList());

        int startIndex = previousLines.size();

        if (startIndex != 0) {
            previousLines.add("엔드포인트$" + "[" + message.getSendDate() + "] $ readPoint" + " $ readPoint" +
                    " $ " + "-----------------새로운 메세지-----------------");
        }

        // 내 엔드포인트가 최하단에 있을 경우엔 그냥 채팅 내용 불러오기 + 엔드포인트부터 위에 20개 불러오기
        List<String> previousLines2 = lines.stream()
                .filter(createFilterCondition(message.getParam()))
                .skip(startIndex)
                .limit(20)
                .map(stringTransformer)
                .toList();

        previousLines.addAll(previousLines2);

        if (previousLines.isEmpty()) {
            return null;
        }
        return previousLines;
    }

    public List<String> readGroupChattingFileSlide(ChatMessageRequest message) {

        List<String> lines = getFile(message);
        Collections.reverse(lines);

        int batchSize = 20;
        //위로 아래로인지 구분
        //라인 갯수만큼 스킵하거나, 전달받은 마지막 라인부터 시작
        //int startIndex = message.isUpDown() ? message.getNowLine() : lines.indexOf(message.getLastLine()) + 1;

        List<String> previousLines = lines.stream()
                .filter(createFilterCondition(message.getParam()))
                .skip(message.getNowLine())
                .map(stringTransformer)
                .limit(batchSize)
                .collect(Collectors.toList());

        //message.setNowLine(startIndex + previousLines.size());

        if (previousLines.isEmpty()) {
            return null;
        }

        return previousLines;
    }


    public int countLinesUntilEndPoint(ChatMessageRequest message) {

        List<String> lines = getFile(message);

        if (lines == null) {
            return 0;
        }

        Collections.reverse(lines);
        // 파일 내용을 역순으로 정렬

        List<String> previousLines = lines.stream()
                .takeWhile(line -> !line.contains(message.getUserEmail() + "EndPoint" + " [" + message.getParam() + "]"))
                .filter(createFilterCondition(message.getParam()))
                .map(stringTransformer)
                .collect(Collectors.toList());

        Collections.reverse(previousLines);

        if (previousLines.isEmpty()) {
            return 0;
        }

        return previousLines.size();

    }

    public static Function<String, String> stringTransformer = str -> {

        // str = str.replaceAll("\\b\\d{4}.\\d{2}.\\d{2} \\d{2}:\\d{2}:\\d{2}\\b", "");
        // str = str.replaceAll("\\b[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\\b", "");
        str = str.replaceAll("\\[\\]", "");
        return str;
    };

    public static Predicate<String> createFilterCondition(String param) {
        return line -> !line.contains("EndPoint") && !line.contains(param);
    }

    public void OnlineChange(AlarmRequest request, String userEmail) {
        userRepository.updateIsOnline(userEmail, request.getOnlineState());
    }

}



