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
        // 메시지 내용

        UUID messageUUid = message.getState() == ChatMessageRequest.fileType.SEND ? UUID.randomUUID() : UUID.fromString(message.getParam());
        String messageContent = message.getState() == ChatMessageRequest.fileType.SEND ?
                "[" + messageUUid + "] $" + "[" + message.getSendDate() + "] $" + message.getUserEmail() + " $ " +
                        message.getNickName() + " $ " + message.getMessage().replace("\n", "\\lineChange") + "\n" :
                message.getUserEmail() + "EndPoint" + " [" + messageUUid + "]" + "\n";

        // 파일을 저장한다.
        String uuid = message.getParam();
        String filePath = "C:\\chat\\chat" + uuid;
        try (FileOutputStream stream = new FileOutputStream(filePath, true)) {
            stream.write(messageContent.getBytes(StandardCharsets.UTF_8));
            message.setMessage(messageContent.replace("\\lineChange", "\n"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<String> readGroupChattingFile(ChatMessageRequest message) {
        try {
            List<String> lines = Files.readAllLines(Paths.get("C:\\chat\\chat" + message.getParam()), Charset.defaultCharset());
            Collections.reverse(lines); // 파일 내용을 역순으로 정렬

            List<String> previousLines = lines.stream()
                    .takeWhile(line -> !line.contains(message.getUserEmail() + "EndPoint" + " [" + message.getParam() + "]"))
                    .filter(createFilterCondition(message.getParam()))
                    .map(stringTransformer)
                    .collect(Collectors.toList());

            if (previousLines.isEmpty()) { // 내 엔드포인트가 최하단에 있을 경우엔 그냥 채팅 내용 불러오기
                previousLines = lines.stream()
                        .filter(createFilterCondition(message.getParam()))
                        .limit(50)
                        .map(stringTransformer)
                        .collect(Collectors.toList());
            }

            Collections.reverse(previousLines);
            System.out.println("previousLines : " + previousLines);
            return previousLines;
        } catch (IOException e) {
            System.out.println("파일 읽기 실패");
            return null;
        }
    }

    public List<String> readGroupChattingFileSlide(ChatMessageRequest message) {
        try {
            List<String> lines = Files.readAllLines(Paths.get("C:\\chat\\chat" + message.getParam()), Charset.defaultCharset());
            Collections.reverse(lines);

            int batchSize = 50;
            //위로 아래로인지 구분
            //라인 갯수만큼 스킵하거나, 전달받은 마지막 라인부터 시작
            int startIndex = message.isUpDown() ? message.getNowLine() : lines.indexOf(message.getLastLine()) + 1;

            List<String> previousLines = lines.stream()
                    .filter(createFilterCondition(message.getParam()))
                    .skip(startIndex)
                    .map(stringTransformer)
                    .limit(batchSize)
                    .collect(Collectors.toList());

            message.setNowLine(startIndex + previousLines.size());
            return previousLines;
        } catch (IOException e) {
            System.out.println("파일 읽기 실패");
            return null;
        }
    }


    public int countLinesUntilEndPoint(ChatMessageRequest message) {
        try {
            List<String> lines = Files.readAllLines(Paths.get("C:\\chat\\chat" + message.getParam()), Charset.defaultCharset());
            Collections.reverse(lines); // 파일 내용을 역순으로 정렬

            String contains1 = (message.getUserEmail() + "EndPoint");
            System.out.println(contains1);

            List<String> previousLines = lines.stream()
                    .takeWhile(line -> !line.contains(message.getUserEmail() + "EndPoint" + " [" + message.getParam() + "]"))
                    .map(stringTransformer)
                    .collect(Collectors.toList());

            Collections.reverse(previousLines);

            System.out.println("previousLinesInCount : " + previousLines);

            if (previousLines.isEmpty()) {
                System.out.println(0);
                return 0;
            }
            System.out.println(previousLines.size());
            return previousLines.size();
        } catch (IOException e) {
            System.out.println(0);
            System.out.println("엔드포인트 파일 읽기 실패");
            return 0;
        }
    }

    public static Function<String, String> stringTransformer = str -> {
        str = str.replaceAll("\\b\\d{4}.\\d{2}.\\d{2} \\d{2}:\\d{2}:\\d{2}\\b", "");
        str = str.replaceAll("\\b[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\\b", "");
        str = str.replaceAll("\\[\\]", "");
        return str;
    };

    public static Predicate<String> createFilterCondition(String param) {
        return line -> !line.contains("EndPoint") && !line.contains(param);
    }
}



