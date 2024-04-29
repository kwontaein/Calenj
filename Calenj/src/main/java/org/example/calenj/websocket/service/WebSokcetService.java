package org.example.calenj.websocket.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.repository.UserRepository;
import org.example.calenj.websocket.dto.request.AlarmRequest;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.websocket.dto.response.ChatMessageResponse;
import org.example.calenj.websocket.dto.response.OnlineUserResponse;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WebSokcetService {

    private final UserRepository userRepository;
    private final GlobalService globalService;
    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final SimpUserRegistry simpUserRegistry;
    private final OnlineUserResponse onlineUserResponse;


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


    public void defaultSend(Authentication authentication, ChatMessageRequest message, String target) {

        String username = returnNickname(authentication);
        String userEmail = returnEmail(username);
        String nowTime = globalService.nowTime();

        message.setNickName(username);
        message.setUserEmail(userEmail);
        message.setSendDate(nowTime);

        ChatMessageResponse response = filterNullFields(message);
        getUsers("topic/" + target + message.getParam());

        //알림 갯수 반환
        if (message.getState() == ChatMessageRequest.fileType.ALARM) {

            try {

                // 파일로부터 채팅 내용을 읽어와서 보내기
                int setPoint = countLinesUntilEndPoint(message);
                response.setEndPoint(setPoint);
                template.convertAndSendToUser(response.getUserEmail(), "/topic/" + target + "/" + response.getParam(), response);

            } catch (Throwable e) {

                // 에러가 발생할 경우.
                e.printStackTrace();

            }
            // State가 1이라면 일반 메시지
        } else if (message.getState() == ChatMessageRequest.fileType.READ) {

            List<String> file = readGroupChattingFile(message);
            response.setMessage(file);
            template.convertAndSendToUser(response.getUserEmail(), "/topic/" + target + "/" + response.getParam(), response);

        } else if (message.getState() == ChatMessageRequest.fileType.RELOAD) {

            List<String> file = readGroupChattingFileSlide(message);
            response.setMessage(file);
            template.convertAndSendToUser(response.getUserEmail(), "/topic/" + target + "/" + response.getParam(), response);

        } else if (message.getState() == ChatMessageRequest.fileType.SEND) {

            saveChattingToFile(message);
            response.setMessage(Collections.singletonList(message.getMessage()));
            response.setChatUUID(message.getChatUUID());
            System.out.println(response);
            template.convertAndSend("/topic/" + target + "/" + response.getParam(), response);

            //2라면 나갈 때 엔드포인트 설정
        } else if (message.getState() == ChatMessageRequest.fileType.ENDPOINT) {

            //파일에 엔드포인트 저장
            saveChattingToFile(message);
        }
    }

    public void personalEvent(Authentication authentication, AlarmRequest request) {
        String username = returnNickname(authentication);
        String userEmail = returnEmail(username);
    }

    // null이 아닌 필드만 포함시키는 메소드
    private ChatMessageResponse filterNullFields(ChatMessageRequest request) {
        ChatMessageResponse filteredResponse = new ChatMessageResponse();
        if (request.getParam() != null) {
            filteredResponse.setParam(request.getParam());
        }
        if (request.getMessage() != null) {
            filteredResponse.setMessage(Collections.singletonList(request.getMessage()));
        }
        if (request.getNickName() != null) {
            filteredResponse.setNickName(request.getNickName());
        }
        if (request.getUserEmail() != null) {
            filteredResponse.setUserEmail(request.getUserEmail());
        }
        if (request.getSendDate() != null) {
            filteredResponse.setSendDate(request.getSendDate());
        }

        filteredResponse.setState(request.getState());
        filteredResponse.setEndPoint(request.getEndPoint());
        // 필요한 필드들을 추가로 확인하여 null이 아닌 것만 설정
        return filteredResponse;
    }

    public void getUsers(String param) {
        Set<SimpUser> simpUsers = simpUserRegistry.getUsers();

        Set<String> filteredUserNames = simpUsers.stream()
                .filter(simpUser -> simpUser.getSessions().stream()
                        .anyMatch(session -> session.getSubscriptions().stream()
                                .anyMatch(subscription -> subscription.getDestination().contains(param))))
                .map(SimpUser::getName)
                .collect(Collectors.toSet());
        System.out.println(param + "을 구독한 유저 목록 : " + filteredUserNames);

        if (onlineUserResponse.getUsers().isEmpty()) {
            onlineUserResponse.setUsers(filteredUserNames);
        } else {
            setUsers(filteredUserNames, onlineUserResponse);
        }
    }

    public void setUsers(Set<String> newUsers, OnlineUserResponse onlineUserResponse) {
        Set<String> returnList = onlineUserResponse.getUsers();
        returnList.addAll(newUsers);
        onlineUserResponse.setUsers(returnList);
    }

}



