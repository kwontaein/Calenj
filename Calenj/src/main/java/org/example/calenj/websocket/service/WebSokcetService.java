package org.example.calenj.websocket.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.repository.UserRepository;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.websocket.dto.response.ChatMessageResponse;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpSubscription;
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
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;
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
        System.out.println("실행??" + message.getMessage());
        // 파일을 저장한다.
        // 메시지 내용
        List<String> lines = getFile(message);

        if (lines == null) {
            return;
        }
        UUID messageUUid = message.getState() == ChatMessageRequest.fileType.SEND ? UUID.randomUUID() : UUID.fromString(message.getParam());
        String messageContent = message.getState() == ChatMessageRequest.fileType.SEND ?
                "[" + messageUUid + "] $" + "[" + message.getSendDate() + "] $" + message.getUserEmail() + " $ " +
                        message.getNickName() + " $ " + message.getMessageType() + " $ " + message.getMessage().replace("\n", "\\lineChange") + "\n" :
                message.getUserEmail() + "EndPoint" + " [" + messageUUid + "]" + "\n";

        try (FileOutputStream stream = new FileOutputStream("C:\\chat\\chat" + message.getParam(), true)) {
            if (lines == null) {
                String Title = "시작라인 $어서오세요! \n";
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
        //response.setOnlineUserList(getAllUsers(authentication));
        response.setOnlineUserList(getUsers(message.getParam()));
        sendSwitch(message, response, target);

    }

    public void sendSwitch(ChatMessageRequest message, ChatMessageResponse response, String target) {
        switch (message.getState()) {
            case ALARM: {
                int setPoint = countLinesUntilEndPoint(message);
                response.setEndPoint(setPoint);
                template.convertAndSendToUser(response.getUserEmail(), "/topic/" + target + "/" + response.getParam(), response);
                return;
            }
            case READ: {
                List<String> file = readGroupChattingFile(message);
                response.setMessage(file);
                template.convertAndSendToUser(response.getUserEmail(), "/topic/" + target + "/" + response.getParam(), response);
                return;
            }
            case RELOAD: {
                List<String> file = readGroupChattingFileSlide(message);
                response.setMessage(file);
                template.convertAndSendToUser(response.getUserEmail(), "/topic/" + target + "/" + response.getParam(), response);
                return;
            }
            case SEND: {
                saveChattingToFile(message);
                response.setMessage(Collections.singletonList(message.getMessage()));
                response.setChatUUID(message.getChatUUID());
                template.convertAndSend("/topic/" + target + "/" + response.getParam(), response);
                return;
            }
            case ENDPOINT: {
                saveChattingToFile(message);
            }
        }
    }

    public void personalEvent(Authentication authentication, ChatMessageRequest request) {
        String username = returnNickname(authentication);
        String userEmail = returnEmail(username);

        ChatMessageResponse response = filterNullFields(request);
//        response.setOnlineUserList(getAllUsers(authentication));
        response.setOnlineUserList(getUsers(request.getParam()));

        if (request.getParam() == userEmail && request.getMessage() == "OFFLINE") {
            Set<String> destinations = getDestination(userEmail);
            for (String destination : destinations) {
                template.convertAndSend(destination, response);
            }
        }
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

    public Set<String> getAllUsers(Authentication authentication) {
        Set<SimpUser> simpUsers = simpUserRegistry.getUsers();
        SimpUser simpUserOnly = simpUserRegistry.getUser(authentication.getName());

        Set<String> myDestination = simpUserOnly.getSessions().stream()
                .filter(simpSession -> !simpSession.getSubscriptions().isEmpty()) // 구독이 비어있지 않은 경우만 선택
                .flatMap(simpSession -> simpSession.getSubscriptions().stream()) // 각 세션의 구독을 하나의 스트림으로 평면화
                .map(SimpSubscription::getDestination) // 각 구독의 목적지를 선택하여 매핑
                .collect(Collectors.toSet()); // Set으로 수집

        Set<String> filteredUserNames = simpUsers.stream()
                .filter(simpUser -> simpUser.getSessions().stream()
                        .anyMatch(session -> session.getSubscriptions().stream()
                                .anyMatch(subscription -> {
                                    String destination = subscription.getDestination();
                                    return myDestination.contains(destination);
                                })))
                .map(SimpUser::getName)
                .collect(Collectors.toSet());

        System.out.println(filteredUserNames);
        return filteredUserNames;
    }

    /**
     * 내가 구독한 토픽
     **/
    public Set<String> getDestination(String userEmail) {
        SimpUser simpUser = simpUserRegistry.getUser(userEmail);
        Set<String> destinations = simpUser.getSessions().stream()
                .flatMap(simpSession ->
                        simpSession.getSubscriptions().stream()
                                .map(simpSubscription -> simpSubscription.getDestination())
                )
                .collect(Collectors.toSet());
        System.out.println("destinations : \n" + destinations);
        return destinations;
    }

    /**
     * 해당 param 구독자들 (온라인 여부)
     **/
    public Set<String> getUsers(String param) {
        Set<SimpUser> simpUsers = simpUserRegistry.getUsers();

        Set<String> filteredUserNames = simpUsers.stream()
                .filter(simpUser -> simpUser.getSessions().stream()
                        .anyMatch(session -> session.getSubscriptions().stream()
                                .anyMatch(subscription -> subscription.getDestination().contains(param)
                                )))
                .map(SimpUser::getName)
                .collect(Collectors.toSet());

        System.out.println("filteredUserNames : " + filteredUserNames);
        return filteredUserNames;
    }

}



