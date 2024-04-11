package org.example.calenj.Main.Service.WebSoket;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.ChatSession;
import org.example.calenj.Main.DTO.Request.Chat.ChatMessageRequest;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.Service.GlobalService;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.*;
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
        try (FileOutputStream stream = new FileOutputStream("E:\\chat\\chat" + message.getGroupMsg(), true)) {
            stream.write(msg.getBytes(StandardCharsets.UTF_8));
            stream.write(nowTime.getBytes(StandardCharsets.UTF_8));
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    public String readChattingFile(ChatMessageRequest message) {
        System.out.println("파일 읽기 : " + message.getGroupMsg());
        // d드라이브의 chat 폴더의 chat 파일
        File file = new File("E:\\chat\\chat" + message.getGroupMsg());
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

    //엔드포인트까지 읽어오는 메소드
    public String readChattingFile2(ChatMessageRequest message) {
        File file = new File("E:\\chat\\chat" + message.getGroupMsg());
        // 파일 있는지 검사
        if (!file.exists()) {
            System.out.println("파일이 없어요");
            return "";
        }
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line).append("\n");
                if (line.contains("EndPoint")) {
                    break;
                }
            }
            return stringBuilder.toString();
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("파일 읽기 실패");
            return "";
        }
    }
    //엔드포인트부터의 알림 갯수 저장하는 메소드

    //파일 불러오는 메소드
    public class ScrollableFileReader {
        private final RandomAccessFile randomAccessFile; // 파일을 읽기 위한 RandomAccessFile 객체
        private long currentPosition; // 현재 파일 내의 위치 (파일 포인터)
        private final int linesToRead; // 한 번에 읽을 라인 수
        private final int maxLinesToShow; // 최대로 보여줄 라인 수

        // 생성자: 파일 경로를 받아 RandomAccessFile을 초기화하고 시작점을 찾음
        public ScrollableFileReader(String filePath) throws IOException {
            randomAccessFile = new RandomAccessFile(filePath, "r");
            currentPosition = 0; // 처음 파일의 시작 위치로 초기화
            linesToRead = 50; // 한 번에 읽을 라인 수를 50으로 설정
            maxLinesToShow = 100; // 최대로 보여줄 라인 수를 100으로 설정
            findStartingPoint(); // 시작점 찾기
        }

        // 파일에서 시작점 찾기
        private void findStartingPoint() throws IOException {
            String line;
            int linesFound = 0; // 찾은 라인 수 초기화
            // 파일을 읽어가며 시작점을 찾음
            while ((line = randomAccessFile.readLine()) != null && linesFound < linesToRead) { //50줄 반환
                currentPosition = randomAccessFile.getFilePointer(); // 현재 위치 갱신
                if (line.contains("CheckEnd")) { // "CheckEnd"를 포함하는 라인을 찾으면
                    break; // 반복문 종료
                }
                linesFound++; // 찾은 라인 수 증가
            }
            System.out.println("알림 갯수 : " + linesFound);
        }

        // 다음 라인들 읽기
        public String readNextLines() throws IOException {
            StringBuilder stringBuilder = new StringBuilder();
            int linesRead = 0; // 읽은 라인 수 초기화
            // linesToRead만큼 라인을 읽거나 maxLinesToShow까지 읽음
            for (int i = 0; i < linesToRead && linesRead < maxLinesToShow; i++) {
                String line = randomAccessFile.readLine(); // 한 줄 읽기
                if (line == null) { // 파일 끝에 도달하면
                    break; // 반복문 종료
                }
                stringBuilder.append(line).append("\n"); // 읽은 줄을 StringBuilder에 추가
                currentPosition = randomAccessFile.getFilePointer(); // 현재 위치 갱신
                linesRead++; // 읽은 라인 수 증가
            }
            return stringBuilder.toString(); // 읽은 라인들을 문자열로 반환
        }

        // 이전 라인들 읽기
        public String readPreviousLines() throws IOException {
            StringBuilder stringBuilder = new StringBuilder();
            long prevPosition = currentPosition; // 현재 위치 저장
            int linesRead = 0; // 읽은 라인 수 초기화

            // linesToRead만큼 이전 라인을 읽거나 maxLinesToShow까지 읽음
            for (int i = 0; i < linesToRead && linesRead < maxLinesToShow; i++) {
                long newPosition = prevPosition - 2; // 이전 위치 계산

                if (newPosition < 0) { // 파일의 시작에 도달하면
                    break; // 반복문 종료
                }

                randomAccessFile.seek(newPosition); // 이전 위치로 파일 포인터 이동
                int byteRead = randomAccessFile.read(); // 한 바이트 읽기

                if (byteRead == '\n') { // 개행 문자를 만나면
                    stringBuilder.insert(0, (char) randomAccessFile.read()).insert(0, (char) byteRead); // 해당 줄을 StringBuilder에 추가
                    prevPosition = newPosition; // 이전 위치 갱신
                    linesRead++; // 읽은 라인 수 증가
                }
            }
            currentPosition = prevPosition; // 현재 위치 갱신
            return stringBuilder.toString(); // 읽은 라인들을 문자열로 반환
        }

        // 파일을 닫음
        public void close() throws IOException {
            randomAccessFile.close(); // RandomAccessFile을 닫음
        }


        public void ReadFile() {
            try {
                ScrollableFileReader reader = new ScrollableFileReader("your_file_path");
                String lines = reader.readNextLines();
                System.out.println(lines);
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}


