package org.example.calenj.Main.Service.WebSoket;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.ChatSession;
import org.example.calenj.Main.DTO.Request.Chat.ChatMessageRequest;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.Service.GlobalService;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WebSokcetService {

    private final UserRepository userRepository;
    private final GlobalService globalService;
    private final List<ChatSession> users = new LinkedList<>();

    public String returnNickname(Authentication authentication) {
        UserEntity userEntity = userRepository.findByUserEmail(authentication.getName()).orElseThrow(() -> new RuntimeException("존재하지 않는 정보"));
        return userEntity.getNickname();
    }

    public String returnEmail(String nickName) {
        UserEntity userEntity = userRepository.findByNickname(nickName).orElseThrow(() -> new RuntimeException("존재하지 않는 정보"));
        return userEntity.getUserEmail();
    }


    public void saveChattingToFile(ChatMessageRequest message) {
        // 파일을 저장한다.
        String uuid = message.getParam();
        String filePath = "C:\\chat\\chat" + uuid;
        // 메시지 내용
        List<String> lines;

        try {
            lines = Files.readAllLines(Paths.get(filePath), Charset.defaultCharset());
        } catch (IOException e) {
            lines = null;
        }

        UUID messageUUid = message.getState() == ChatMessageRequest.fileType.SEND ? UUID.randomUUID() : UUID.fromString(message.getParam());
        String messageContent = message.getState() == ChatMessageRequest.fileType.SEND ?
                "[" + messageUUid + "] $" + "[" + message.getSendDate() + "] $" + message.getUserEmail() + " $ " +
                        message.getNickName() + " $ " + message.getMessage().replace("\n", "\\lineChange") + "\n" :
                message.getUserEmail() + "EndPoint" + " [" + messageUUid + "]" + "\n";


        try (FileOutputStream stream = new FileOutputStream(filePath, true)) {
            if (lines == null) {
                stream.write(message.getParam().getBytes(StandardCharsets.UTF_8));
                stream.write("캘린룸, 생성일자 :".getBytes(StandardCharsets.UTF_8));
                stream.write((message.getSendDate() + "\n").getBytes(StandardCharsets.UTF_8));
            }
            stream.write(messageContent.getBytes(StandardCharsets.UTF_8));
            message.setChatUUID(messageUUid);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<String> readGroupChattingFile(ChatMessageRequest message) {
        String uuid = message.getParam();
        String filePath = "C:\\chat\\chat" + uuid;
        try {
            List<String> lines = Files.readAllLines(Paths.get(filePath), Charset.defaultCharset());
            Collections.reverse(lines); // 파일 내용을 역순으로 정렬

            List<String> previousLines = lines.stream()
                    .takeWhile(line -> !line.contains(message.getUserEmail() + "EndPoint" + " [" + message.getParam() + "]"))
                    .filter(createFilterCondition(message.getParam()))
                    .map(stringTransformer)
                    .collect(Collectors.toList());

            int startIndex = previousLines.size();

            if (startIndex != 0) {
                UUID readPoint = UUID.randomUUID();
                previousLines.add("[" + readPoint + "] $" + "[" + message.getSendDate() + "] $ readPoint" + " $ readPoint" +
                        " $ " + "-----------------새로운 메세지-----------------");
                System.out.println("previousLines in if-else: " + previousLines);
            }

            // 내 엔드포인트가 최하단에 있을 경우엔 그냥 채팅 내용 불러오기 + 엔드포인트부터 위에 20개 불러오기
            List<String> previousLines2 = lines.stream()
                    .filter(createFilterCondition(message.getParam()))
                    .skip(startIndex)
                    .limit(20)
                    .map(stringTransformer)
                    .collect(Collectors.toList());

            previousLines.addAll(previousLines2);

            Collections.reverse(previousLines);
            return previousLines;
        } catch (IOException e) {
            return null;
        }
    }

    public List<String> readGroupChattingFileSlide(ChatMessageRequest message) {

        String uuid = message.getParam();
        String filePath = "C:\\chat\\chat" + uuid;
        try {
            List<String> lines = Files.readAllLines(Paths.get(filePath), Charset.defaultCharset());
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
            return previousLines;
        } catch (IOException e) {
            return null;
        }
    }


    public int countLinesUntilEndPoint(ChatMessageRequest message) {
        String uuid = message.getParam();
        String filePath = "C:\\chat\\chat" + uuid;
        try {
            List<String> lines = Files.readAllLines(Paths.get(filePath), Charset.defaultCharset());
            Collections.reverse(lines); // 파일 내용을 역순으로 정렬

            List<String> previousLines = lines.stream()
                    .takeWhile(line -> !line.contains(message.getUserEmail() + "EndPoint" + " [" + message.getParam() + "]"))
                    .map(stringTransformer)
                    .collect(Collectors.toList());

            Collections.reverse(previousLines);

            if (previousLines.isEmpty()) {
                return 0;
            }
            return previousLines.size();
        } catch (IOException e) {
            return 0;
        }
    }

    public static Function<String, String> stringTransformer = str -> {
        /*
        str = str.replaceAll("\\b\\d{4}.\\d{2}.\\d{2} \\d{2}:\\d{2}:\\d{2}\\b", "");
        str = str.replaceAll("\\b[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\\b", "");*/
        str = str.replaceAll("\\[\\]", "");
        return str;
    };

    public static Predicate<String> createFilterCondition(String param) {
        return line -> !line.contains("EndPoint") && !line.contains(param);
    }
}



