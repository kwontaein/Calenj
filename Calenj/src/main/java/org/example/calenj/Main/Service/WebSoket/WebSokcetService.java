package org.example.calenj.Main.Service.WebSoket;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.ChatSession;
import org.example.calenj.Main.DTO.Request.Chat.ChatMessageRequest;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.Service.GlobalService;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.File;
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
        return userEntity.getNickname();
    }


    public void saveChattingToFile(ChatMessageRequest message) {
        // 메시지 내용
        String nowTime = globalService.nowTime();
        UUID messageUUid = message.getState() == ChatMessageRequest.fileType.SEND ? UUID.randomUUID() : UUID.fromString(message.getGroupMsg());
        String messageContent = message.getState() == ChatMessageRequest.fileType.SEND ?
                message.getUseEmail() + " : " + message.getNickName() + " : " + message.getMessage().replace("\n", "\\lineChange") +
                        " [" + nowTime + "]" + " [ " + messageUUid + " ]" + "\n" :
                message.getUseEmail() + " EndPoint" + " [" + nowTime + "]" + " [ " + messageUUid + " ]" + "\n";

        // 파일을 저장한다.
        String uuid = message.getGroupMsg() != null ? message.getGroupMsg() : message.getFriendMsg();
        String filePath = "C:\\chat\\chat" + uuid;
        try (FileOutputStream stream = new FileOutputStream(filePath, true)) {
            stream.write(messageContent.getBytes(StandardCharsets.UTF_8));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public List<String> readGroupChattingFile(ChatMessageRequest message) {
        try {
            List<String> lines = Files.readAllLines(Paths.get("C:\\chat\\chat" + message.getGroupMsg()), Charset.defaultCharset());
            Collections.reverse(lines); // 파일 내용을 역순으로 정렬

            List<String> previousLines = lines.stream().takeWhile(line -> !line.contains(message.getUseEmail() + " EndPoint") && !line.contains(message.getGroupMsg()))
                    .filter(line -> !line.contains("EndPoint") && !line.contains(message.getGroupMsg()))
                    .collect(Collectors.toList());

            if (previousLines.isEmpty()) { // 내 엔드포인트가 최하단에 있을 경우엔 그냥 채팅 내용 불러오기
                previousLines = lines.stream()
                        .filter(line -> !line.contains("EndPoint") && !line.contains(message.getGroupMsg()))
                        .limit(50)
                        .collect(Collectors.toList());
            }

            Collections.reverse(previousLines);
            return previousLines;
        } catch (IOException e) {
            System.out.println("파일 읽기 실패");
            return null;
        }
    }

    public List<String> readGroupChattingFileSlide(ChatMessageRequest message) {
        //처음 라인 , 끝 라인(시간+ 아이디+ 내용)
        //끝 라인 받아서 해당 위치부터 받아올거임 ->
        //맨위, 맨아래 닿았을때 특정 조건을 통해 동작을 막을 건데
        //
        //무한로딩 버그 해결해야함 -> 두 메시지가 같고, 사이즈가 0 반환값()
        try {
            List<String> lines = Files.readAllLines(Paths.get("C:\\chat\\chat" + message.getGroupMsg()), Charset.defaultCharset());
            Collections.reverse(lines); // 파일 내용을 역순으로 정렬

            List<String> previousLines = lines.stream()
                    .filter(line -> !line.contains("EndPoint") && !line.contains(message.getGroupMsg()))
                    .limit(50)
                    .collect(Collectors.toList());
            
            Collections.reverse(previousLines);
            return previousLines;
        } catch (IOException e) {
            System.out.println("파일 읽기 실패");
            return null;
        }
    }

    //엔드포인트부터의 알림 갯수 저장하는 메소드
    public int countLinesUntilEndPoint(ChatMessageRequest message) {
        File file = new File("C:\\chat\\chat" + message.getGroupMsg());
        int lineCount = 0;
        boolean endPointFound = false; // 엔드포인트를 찾았는지 여부를 나타내는 변수

        // 파일 있는지 검사
        if (!file.exists()) {
            System.out.println("파일이 없어요");
            return 0;
        }

        try {
            List<String> lines = Files.readAllLines(Paths.get(file.getAbsolutePath()), Charset.defaultCharset());
            Collections.reverse(lines); // 파일 내용을 역순으로 정렬

            for (String line : lines) {
                if (!endPointFound) {
                    lineCount++;
                } else {
                    break;
                }
                if (line.contains(message.getNickName() + " EndPoint")) {
                    endPointFound = true; // 엔드포인트를 찾았음을 표시
                }
            }
            return lineCount;
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("파일 읽기 실패");
            return 0;
        }
    }
}


