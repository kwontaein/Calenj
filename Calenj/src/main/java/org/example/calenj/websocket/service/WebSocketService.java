package org.example.calenj.websocket.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.file.service.FileService;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.repository.UserRepository;
import org.example.calenj.user.service.UserService;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;
import org.example.calenj.websocket.dto.response.ChatMessageResponse;
import org.example.calenj.websocket.dto.response.MessageResponse;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpSubscription;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WebSocketService {

    private final UserRepository userRepository;

    private final FileService fileService;
    private final GlobalService globalService;
    private final UserService userService;

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final SimpUserRegistry simpUserRegistry;


    /**
     * 유저정보 반환
     *
     * @param authentication 인증 정보 받기
     **/
    public UserEntity returnUserEntity(Authentication authentication) {
        return userRepository.findByUserId(UUID.fromString(authentication.getName())).orElseThrow(() -> new RuntimeException("존재하지 않는 유저입니다"));
    }

    /**
     * 기본 정보 세팅
     *
     * @param target         보낼 위치
     * @param message        전달받은 정보들
     * @param authentication 웹소켓 인증 정보
     **/
    public void defaultSend(Authentication authentication, ChatMessageRequest message, String target) {
        //내정보 받기
        UserEntity userEntity = returnUserEntity(authentication);
        //현재시간 받기
        String nowTime = globalService.nowTime();
        //보내는 사람 아이디 설정
        message.setUserId(userEntity.getUserId());
        //보내는 날짜 설정
        message.setSendDate(nowTime);
        //response 채우기
        ChatMessageResponse response = globalService.filterNullFields(message);
        //target 정하기
        response.setTarget(target);
        response.setOnlineUserList(getUsers(message.getParam()));
        response.setReceivedUUID(UUID.randomUUID());
        sendSwitch(message, response, target);

    }

    /**
     * 요청에 따른 분기
     *
     * @param target   보낼 위치
     * @param message  전달받은 정보들
     * @param response 전달할 정보들
     **/
    public void sendSwitch(ChatMessageRequest message, ChatMessageResponse response, String target) {
        switch (message.getState()) {
            case ALARM: {
                response.setEndPoint(fileService.countLinesUntilEndPoint(message));
                if (target.equals("friendMsg") && response.getEndPoint() != 0) {
                    userService.setChatIsOpen(response.getParam(), message.getUserId());
                }
                template.convertAndSendToUser(String.valueOf(response.getUserId()), "/topic/" + target + "/" + response.getParam(), response);
                return;
            }
            case SEND: {
                fileService.saveChattingToFile(message);

                MessageResponse messageResponse = new MessageResponse(
                        message.getChatUUID().toString(),
                        message.getSendDate(),
                        message.getUserId().toString(),
                        message.getMessageType(),
                        message.getMessage());
                response.setMessage(Collections.singletonList(messageResponse));
                template.convertAndSend("/topic/" + target + "/" + response.getParam(), response);
                return;
            }
            case ENDPOINT: {
                fileService.saveChattingToFile(message);
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

        if (request.getState() == null) {
            return;
        }

        if (request.getState() == ChatMessageRequest.fileType.ONLINE) {
            //System.out.println("실행 온라인");
            //내가 접속 시 -> 온라인 목록 불러옴 + 다른사람들한테 나 온라인이라고 알리기
            sendOnlineStateFirstTime(userId, globalService.filterNullFields(request));
            sendOnlineState(userId, globalService.filterNullFields(request));
        } else if (request.getState() == ChatMessageRequest.fileType.OFFLINE) {
            //System.out.println("실행 오프라인");
            //끊을 시 -> 오프라인이라고만 알리기
            sendOnlineState(userId, globalService.filterNullFields(request));
        }
    }

    /**
     * 로그인 후 웹소켓 연결 시, 모든(나와 관련된) 온라인 유저 정보 불러오기
     *
     * @param userId   로그인 한 유저 아이디
     * @param response 응답(온라인 상태 포함)
     */
    public void sendOnlineStateFirstTime(String userId, ChatMessageResponse response) {
        Set<String> friendList = new HashSet<>();

        //온라인 유저 정보 다시 반환
        for (String destination : getDestination(userId)) {
            //온라인 유저 정보 받아서
            Set<String> userList = getUsers(destination);
            if (userList == null) {
                userList = new HashSet<>();
            }
            userList.add(userId);

            //반환정보에 담기
            response.setOnlineUserList(userList);
            response.setTarget(extractTopic(destination));
            response.setParam(extractUUID(destination));
            response.setState(ChatMessageRequest.fileType.ONLINE);
            if (Objects.equals(extractTopic(destination), "friendMsg")) {
                friendList.addAll(userList);
            } else {
                template.convertAndSendToUser(userId, destination, response);
            }
        }

        response.setOnlineUserList(friendList);
        response.setParam(userId);
        response.setTarget("friendMsg");
        template.convertAndSend("/topic/personalTopic/" + userId, response);
    }

    /**
     * 온라인 상태 전송
     *
     * @param userId   로그인 한 유저 아이디
     * @param response 응답(온라인 상태 포함)
     */
    public void sendOnlineState(String userId, ChatMessageResponse response) {
        //온라인 유저 정보 다시 반환
        for (String destination : getDestination(userId)) {
            //온라인 유저 정보 받아서
            Set<String> userList = new HashSet<>();
            userList.add(userId);

            if (response.getState() == ChatMessageRequest.fileType.ONLINE) {
                response.setState(ChatMessageRequest.fileType.ONLINE);
            }

            //반환정보에 담기
            response.setOnlineUserList(userList);
            response.setTarget(extractTopic(destination));
            response.setParam(extractUUID(destination));
            template.convertAndSend(destination, response);
        }
    }

    /**
     * 유저에게 알람 보내기
     *
     * @param userId 알람 보낼 유저 아이디
     * @param kind   알람 종류
     */
    public void userAlarm(UUID userId, String kind, String ChatId) {
        MessageResponse messageResponse = new MessageResponse(UUID.randomUUID().toString(), globalService.nowTime(), userId.toString(), "Alarm", ChatId);

        ChatMessageResponse chatMessageResponse = new ChatMessageResponse();
        chatMessageResponse.setUserId(userId);
        chatMessageResponse.setParam(kind);
        chatMessageResponse.setState(ChatMessageRequest.fileType.ALARM);

        if (kind.equals("친구수락")) {
            chatMessageResponse.setMessage(Collections.singletonList(messageResponse));
        }

        template.convertAndSend("/topic/personalTopic/" + userId, chatMessageResponse);
    }

    /**
     * url(웹소켓 구독 주소) 에서 UUID 추출하기
     *
     * @param url 웹소켓 구독 주소
     * @return UUID
     */
    public static String extractUUID(String url) {
        Pattern pattern = Pattern.compile("([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$");
        Matcher matcher = pattern.matcher(url);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    /**
     * url(웹소켓 구독 주소) 에서 topic(그룹 / 친구) 추출하기
     *
     * @param url 웹소켓 구독 주소
     */
    public static String extractTopic(String url) {
        Pattern pattern = Pattern.compile("/topic/([^/]*)");
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
        if (simpUser == null) {
            return null;
        }
        return simpUser.getSessions().stream()
                .flatMap(simpSession ->
                        simpSession.getSubscriptions().stream()
                                .map(SimpSubscription::getDestination)
                )
                .collect(Collectors.toSet());

    }

    /**
     * 해당 param 구독자들 (온라인 여부)
     *
     * @param param 전달받은 param(그룹 / 친구 채팅방 아이디)
     **/
    public Set<String> getUsers(String param) {
        Set<SimpUser> simpUsers = simpUserRegistry.getUsers();
        return simpUsers.stream()
                .filter(simpUser -> simpUser.getSessions().stream()
                        .anyMatch(session -> session.getSubscriptions().stream()
                                .anyMatch(subscription -> subscription.getDestination().contains(param)
                                )))
                .map(SimpUser::getName)
                .collect(Collectors.toSet());
    }

    public void groupEventChat(String groupId, String userId, String messageType, String message) {
        ChatMessageRequest chatMessageRequest = new
                ChatMessageRequest(
                UUID.fromString(userId),
                ChatMessageRequest.fileType.SEND,
                groupId,
                message,
                0,
                globalService.nowTime(),
                UUID.randomUUID(),
                0,
                messageType
        );
        MessageResponse messageResponse = new MessageResponse(
                chatMessageRequest.getChatUUID().toString(),
                chatMessageRequest.getSendDate(),
                chatMessageRequest.getUserId().toString(),
                chatMessageRequest.getMessageType(),
                chatMessageRequest.getMessage());

        fileService.saveChattingToFile(chatMessageRequest);

        ChatMessageResponse chatMessageResponse = globalService.filterNullFields(chatMessageRequest);
        chatMessageResponse.setMessage(Collections.singletonList(messageResponse));
        chatMessageResponse.setReceivedUUID(UUID.randomUUID());
        template.convertAndSend("/topic/groupMsg/" + chatMessageResponse.getParam(), chatMessageResponse);

    }
}



