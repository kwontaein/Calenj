package org.example.calenj.friend.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.event.domain.EventEntity;
import org.example.calenj.event.dto.response.EventResponse;
import org.example.calenj.event.repository.EventRepository;
import org.example.calenj.friend.domain.FriendEntity;
import org.example.calenj.friend.dto.response.FriendResponse;
import org.example.calenj.friend.dto.response.AddFriendResponse;
import org.example.calenj.friend.repository.FriendRepository;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.repository.UserRepository;
import org.example.calenj.websocket.service.WebSocketService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class FriendService {
    private final GlobalService globalService;
    private final FriendRepository friendRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final WebSocketService webSocketService;


    public UserEntity getUserEntityByUserName(String userName) {
        UserEntity userEntity = userRepository.findByUserUsedName(userName).orElse(null);
        return userEntity;
    }

    public UserEntity getUserEntityById(UUID userID) {
        UserEntity userEntity = userRepository.findByUserId(userID).orElseThrow(() -> new RuntimeException());
        return userEntity;
    }

    public List<FriendResponse> friendList() {
        UUID myUserID = UUID.fromString(globalService.extractFromSecurityContext().getUsername());
        return friendRepository.findFriendListById(myUserID).orElseThrow(() -> new RuntimeException("친구 목록이 비었습니다"));
    }

    public AddFriendResponse requestFriend(String friendUserName) {

        AddFriendResponse response = new AddFriendResponse();
        UserEntity ownUser = globalService.myUserEntity();

        // 나에게 초대는 불가
        if (isAddingSelf(friendUserName, ownUser)) {
            return createErrorResponse("나에게 친구 추가는 불가능합니다.");
        }

        // 친구 유저 정보가 존재하는지 확인
        UserEntity friendUser = getUserEntityByUserName(friendUserName);
        if (friendUser == null) {
            return createErrorResponse("존재하지 않는 아이디입니다. 아이디를 다시 확인해주세요.");
        }

        // 이미 친구인 경우
        if (isAlreadyFriend(friendUser, ownUser)) {
            return createErrorResponse("이미 친구입니다.");
        }

        // 친구 요청
        return processFriendRequest(ownUser, friendUser, response);
    }

    private boolean isAddingSelf(String friendUserName, UserEntity ownUser) {
        if (friendUserName.equals(ownUser.getUserUsedName())) {
            return true;
        }
        return false;
    }

    private boolean isAlreadyFriend(UserEntity friendUser, UserEntity ownUser) {
        if (friendRepository.findFriendByIdIsAccept(friendUser.getUserId(), ownUser.getUserId()).orElse("Null").equals("ACCEPT")) {
            return true;
        }
        return false;
    }

    private AddFriendResponse createErrorResponse(String message) {
        return responseSetting(false, message, null);
    }

    private AddFriendResponse createSuccessResponse(String message, UUID userId) {
        return responseSetting(true, message, userId);
    }

    private AddFriendResponse processFriendRequest(UserEntity ownUser, UserEntity friendUser, AddFriendResponse response) {
        if (friendRepository.findFriendById(friendUser.getUserId()).orElse(null) != null) {
            return repositorySetting(friendUser.getUserId());
        } else {
            return onlyOne(ownUser, friendUser.getUserId());
        }
    }

    public AddFriendResponse repositorySetting(UUID friendUserId) {
        return createSuccessResponse("상대가 보낸 요청이 이미 있습니다. 친구 요청을 수락하시겠습니까?", friendUserId);
    }

    public AddFriendResponse onlyOne(UserEntity ownUser, UUID friendUserId) {//동일한 요청 정보가 있다면? -> 저장x
        if (!eventRepository.checkIfDuplicatedEvent(ownUser.getUserId(), friendUserId)) {
            return createSuccessResponse("친구 정보 조회에 성공했습니다.", friendUserId);
        }
        return createErrorResponse("이미 요청한 유저입니다");
    }

    public AddFriendResponse responseSetting(boolean isSuccess, String message, UUID userId) {
        AddFriendResponse response = new AddFriendResponse();
        response.setSuccess(isSuccess);
        response.setMessage(message);
        response.setUserId(userId);
        return response;
    }

    public void saveFriend(String friendUsedName) {
        UserEntity ownUser = globalService.myUserEntity();
        UserEntity friendUser = getUserEntityByUserName(friendUsedName);

        FriendEntity friendEntity = FriendEntity
                .builder()
                .ownUserId(ownUser)
                .friendUserId(friendUser.getUserId())
                .nickName(friendUser.getNickname())
                .createDate(String.valueOf(LocalDate.now()))
                .ChattingRoomId(UUID.randomUUID())
                .status(FriendEntity.statusType.WAITING).build();
        //이벤트테이블추가
        EventEntity eventEntity = EventEntity
                .builder()
                .ownUserId(ownUser)
                .eventUserId(friendUser.getUserId())
                .eventPurpose("Friend Request")
                .eventName(EventEntity.eventType.RequestFriend)
                .eventStatus(EventEntity.statusType.WAITING)
                .createDate(String.valueOf(LocalDate.now()))
                .build();

        friendRepository.save(friendEntity);
        eventRepository.save(eventEntity);
        webSocketService.userAlarm(friendUser.getUserId(), "친구요청");
    }

    public void acceptFriend(UUID friendUserId) {
        UserEntity friendUser = getUserEntityById(friendUserId);
        FriendResponse friendResponse = friendRepository.findFriendById(friendUserId).orElse(null);
        friendRepository.updateStatus(friendUserId, FriendEntity.statusType.ACCEPT);

        FriendEntity friendEntity = FriendEntity
                .builder()
                .ownUserId(globalService.myUserEntity())
                .friendUserId(friendUserId)
                .nickName(friendUser.getNickname())
                .createDate(String.valueOf(LocalDate.now()))
                .ChattingRoomId(friendResponse.getChattingRoomId())
                .status(FriendEntity.statusType.ACCEPT)
                .build();

        friendRepository.save(friendEntity);
        eventRepository.updateEventFriendRequest(friendUserId, EventEntity.statusType.ACCEPT);

        //:TODO 확인필요
        // 파일을 저장한다.
        try (FileOutputStream stream = new FileOutputStream("C:\\chat\\chat" + friendEntity.getFriendId(), true)) {
            String nowTime = globalService.nowTime();
            stream.write(friendUser.getNickname().getBytes(StandardCharsets.UTF_8));
            stream.write("프랜드, 친구일자 :".getBytes(StandardCharsets.UTF_8));
            stream.write(nowTime.getBytes(StandardCharsets.UTF_8));
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    public AddFriendResponse responseFriend(UUID friendUserName, String isAccept) {
        //요청 정보가 없다면 오류 반환
        FriendResponse friendResponse = friendRepository.findFriendById(friendUserName).orElse(null);
        if (friendResponse == null) {
            return createErrorResponse("올바르지 않은 요청입니다.");
        }

        //거절이라면
        if (isAccept.equals("REJECT")) {
            //요청한 유저 친구목록에서 삭제
            friendRepository.deleteByOwnUserId(friendUserName);
            //이벤트 상태 거절로 변경
            eventRepository.updateEventFriendRequest(friendUserName, EventEntity.statusType.REJECT);
            webSocketService.userAlarm(friendUserName, "친구거절");
            return createErrorResponse("친구 요청을 거절했습니다.");
        } else {
            acceptFriend(friendUserName);
            webSocketService.userAlarm(friendUserName, "친구수락");
            return createSuccessResponse("친구 요청을 수락했습니다.", friendUserName);
        }
    }

    //내가 받은 요청 목록
    public List<EventResponse> ResponseFriendList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        return eventRepository.ResponseEventListById(UUID.fromString(userDetails.getUsername())).orElse(null);
    }

    //내가 보낸 요청 목록
    public List<EventResponse> RequestFriendList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        return eventRepository.RequestEventListById(UUID.fromString(userDetails.getUsername())).orElse(null);
    }

    public String getEventContent(String myUserId, UUID userId) {
        return eventRepository.findEventContentByIds(UUID.fromString(myUserId), userId).orElse("");
    }

    public void CancelRequest() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        eventRepository.deleteByUserId(UUID.fromString(userDetails.getUsername()));
    }
}