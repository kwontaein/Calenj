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
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WebSocketService {

    private final UserRepository userRepository;
    private final GlobalService globalService;
    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final SimpUserRegistry simpUserRegistry;

    /**
     * 유저정보 반환
     *
     * @param authentication 인증 정보 받기
     **/
    public UserEntity returnUserEntity(Authentication authentication) {
        UserEntity userEntity = userRepository.findByUserId(UUID.fromString(authentication.getName())).orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다"));
        return userEntity;
    }


    /**
     * 파일 받아오기
     *
     * @param message 전달받은 내용
     **/
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

    /**
     * 채팅내용 파일에 저장
     *
     * @param message 전달받은 내용
     **/
    public void saveChattingToFile(ChatMessageRequest message) {
        System.out.println("getMessage : \n" + message.getMessage());
        // 파일을 저장한다.
        // 메시지 내용
        List<String> lines = getFile(message);

        if (lines == null) {
            return;
        }
        UUID messageUUid = message.getState() == ChatMessageRequest.fileType.SEND ? UUID.randomUUID() : UUID.fromString(message.getParam());
        String messageContent = message.getState() == ChatMessageRequest.fileType.SEND ?
                "[" + messageUUid + "] $" + "[" + message.getSendDate() + "]" + " $ " +
                        message.getUserId() + " $ " + message.getMessageType() + " $ " + message.getMessage().replace("\n", "\\lineChange") + "\n" :
                message.getUserId() + "EndPoint" + " [" + messageUUid + "]" + "\n";

        System.out.println("messageContent : \n" + messageContent);
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

    /**
     * 처음 파일 내용 읽어오기
     *
     * @param message 전달받은 내용
     **/
    public List<String> readGroupChattingFile(ChatMessageRequest message) {
        List<String> lines = getFile(message);

        if (lines == null) {
            return null;
        }

        Collections.reverse(lines); // 파일 내용을 역순으로 정렬
        List<String> previousLines = lines.stream()
                .takeWhile(line -> !line.contains(message.getUserId() + "EndPoint" + " [" + message.getParam() + "]") && !line.contains("시작라인$어서오세요$$$$"))
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
        System.out.println("previousLines : " + previousLines);

        if (previousLines.isEmpty()) {
            return null;
        }
        return previousLines;
    }

    /**
     * 위의 파일 내용 읽어오기
     *
     * @param message 전달받은 내용
     **/
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

    /**
     * 엔드포인트까지의 라인 갯수 세기
     *
     * @param message 전달받은 내용
     **/
    public int countLinesUntilEndPoint(ChatMessageRequest message) {

        List<String> lines = getFile(message);

        if (lines == null) {
            return 0;
        }

        Collections.reverse(lines);
        // 파일 내용을 역순으로 정렬

        List<String> previousLines = lines.stream()
                .takeWhile(line -> !line.contains(message.getUserId() + "EndPoint" + " [" + message.getParam() + "]") && !line.contains("시작라인$어서오세요$$$$"))
                .filter(createFilterCondition(message.getParam()))
                .map(stringTransformer)
                .collect(Collectors.toList());

        Collections.reverse(previousLines);

        if (previousLines.isEmpty()) {
            return 0;
        }

        return previousLines.size();

    }

    /**
     * 내용 변경하는 람다
     **/
    public static Function<String, String> stringTransformer = str -> {
        str = str.replaceAll("\\[\\]", "");
        return str;
    };

    /**
     * 개인 토픽 관련 메세지 (알림 등)
     *
     * @param param 멈출 내용
     **/
    public static Predicate<String> createFilterCondition(String param) {
        return line -> !line.contains("EndPoint" + " [" + param + "]");
    }

    /**
     * 개인 토픽 관련 메세지 (알림 등)
     *
     * @param target         보낼 위치
     * @param message        전달받은 정보들
     * @param authentication 웹소켓 인증 정보
     **/
    public void defaultSend(Authentication authentication, ChatMessageRequest message, String target) {

        UserEntity userEntity = returnUserEntity(authentication);
        String nowTime = globalService.nowTime();

        message.setUserId(userEntity.getUserId());
        message.setSendDate(nowTime);

        ChatMessageResponse response = filterNullFields(message);
        response.setTarget(target);
        response.setOnlineUserList(getUsers(message.getParam()));
        sendSwitch(message, response, target);

    }

    /**
     * 개인 토픽 관련 메세지 (알림 등)
     *
     * @param target   보낼 위치
     * @param message  전달받은 정보들
     * @param response 전달할 정보들
     **/
    public void sendSwitch(ChatMessageRequest message, ChatMessageResponse response, String target) {
        switch (message.getState()) {
            case ALARM: {
                int setPoint = countLinesUntilEndPoint(message);
                response.setEndPoint(setPoint);
                template.convertAndSendToUser(String.valueOf(response.getUserId()), "/topic/" + target + "/" + response.getParam(), response);
                return;
            }
            case READ: {
                List<String> file = readGroupChattingFile(message);
                response.setMessage(file);
                template.convertAndSendToUser(String.valueOf(response.getUserId()), "/topic/" + target + "/" + response.getParam(), response);
                return;
            }
            case RELOAD: {
                List<String> file = readGroupChattingFileSlide(message);
                response.setMessage(file);
                template.convertAndSendToUser(String.valueOf(response.getUserId()), "/topic/" + target + "/" + response.getParam(), response);
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

    /**
     * 개인 토픽 관련 메세지 (알림 등)
     *
     * @param authentication 웹소켓 인증 정보
     * @param request        전달받은 정보들
     **/
    public void personalEvent(Authentication authentication, ChatMessageRequest request) {
        UserEntity userEntity = returnUserEntity(authentication);
        String userId = String.valueOf(userEntity.getUserId());
        ChatMessageResponse response = filterNullFields(request);
        if (request.getMessage() != null && request.getMessage().equals("OnlineState")) {
            sendOnlineState(userId, response);
        }
    }

    public void sendOnlineState(String userId, ChatMessageResponse response) {
        //내 구독 정보들 받아다가
        System.out.println("sendOnlineState 실행");
        //온라인 유저 정보 다시 반환
        for (String destination : getDestination(userId)) {
            //온라인 유저 정보 받아서
            Set<String> userList = getUsers(extractUUID(destination));
            //내 정보 제거하고
            userList.remove(userId);
            //반환정보에 담기
            response.setOnlineUserList(userList);
            template.convertAndSend(destination, response);
        }
    }

    public void userAlarm(UUID userId, String kind) {
        ChatMessageResponse chatMessageResponse = new ChatMessageResponse();
        chatMessageResponse.setUserId(userId);
        chatMessageResponse.setParam(kind);
        chatMessageResponse.setState(ChatMessageRequest.fileType.ALARM);
        template.convertAndSend("/topic/personalTopic/" + userId, chatMessageResponse);
    }


    /**
     * response 설정
     *
     * @param request 전달받은 정보들
     **/

    // null이 아닌 필드만 포함시키는 메소드
    private ChatMessageResponse filterNullFields(ChatMessageRequest request) {
        ChatMessageResponse filteredResponse = new ChatMessageResponse();
        if (request.getParam() != null) {
            filteredResponse.setParam(request.getParam());
        }
        if (request.getMessage() != null) {
            filteredResponse.setMessage(Collections.singletonList(request.getMessage()));
        }
        if (request.getUserId() != null) {
            filteredResponse.setUserId(request.getUserId());
        }
        if (request.getSendDate() != null) {
            filteredResponse.setSendDate(request.getSendDate());
        }

        filteredResponse.setState(request.getState());
        filteredResponse.setEndPoint(request.getEndPoint());
        // 필요한 필드들을 추가로 확인하여 null이 아닌 것만 설정
        return filteredResponse;
    }

    /**
     * 토픽을 구독한 모든 유저 목록
     *
     * @param authentication 웹소켓 인증 정보
     **/
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

    public static String extractUUID(String url) {
        Pattern pattern = Pattern.compile("([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$");
        Matcher matcher = pattern.matcher(url);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    /**
     * 내가 구독한 토픽
     *
     * @param userId 내 아이디
     **/
    public Set<String> getDestination(String userId) {
        SimpUser simpUser = simpUserRegistry.getUser(userId);
        Set<String> destinations = simpUser.getSessions().stream()
                .flatMap(simpSession ->
                        simpSession.getSubscriptions().stream()
                                .map(simpSubscription -> simpSubscription.getDestination())
                )
                .collect(Collectors.toSet());
        System.out.println(destinations);
        return destinations;
    }

    /**
     * 해당 param 구독자들 (온라인 여부)
     *
     * @param param 전달받은 param(그룹 / 친구 채팅방 아이디)
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



