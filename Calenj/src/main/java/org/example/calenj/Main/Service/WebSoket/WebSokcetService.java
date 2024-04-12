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
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.LinkedList;
import java.util.List;

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

    public void saveChattingToFile(ChatMessageRequest message) {

        // 메시지 내용
        String msg = message.getNickName() + " : " + message.getMessage() + "\n";
        String nowTime = globalService.nowTime() + "\n";

        // 파일을 저장한다.
        try (FileOutputStream stream = new FileOutputStream("C:\\chat\\chat" + message.getGroupMsg(), true)) {
            stream.write(msg.getBytes(StandardCharsets.UTF_8));
            stream.write(nowTime.getBytes(StandardCharsets.UTF_8));
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    public String readChattingFile(ChatMessageRequest message) {
        System.out.println("파일 읽기 : " + message.getGroupMsg());
        // d드라이브의 chat 폴더의 chat 파일
        File file = new File("C:\\chat\\chat" + message.getGroupMsg());
        // 파일 있는지 검사
        if (!file.exists()) {
            System.out.println("파일이 없어요");
            return "";
        }
        //TODO 2차원배열로 짤라서 최대 행 갯수가 넘어가면 다음 으로 넘어가게
        //TODO 안읽은데 표시까지 전부 불러오는거 1개
        //그 위부터는 끊어서 무한스크롤
        try (FileInputStream stream = new FileInputStream(file)) {

            return new String(stream.readAllBytes());
        } catch (Throwable e) {
            e.printStackTrace();
            System.out.println("파일 읽기 실패");
            return "";
        }
    }


}


