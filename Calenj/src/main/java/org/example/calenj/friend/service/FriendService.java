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
import org.example.calenj.websocket.service.WebSokcetService;
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
    private final WebSokcetService webSokcetService;


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

        // Check if the user is trying to add themselves
        if (isAddingSelf(friendUserName, ownUser, response)) {
            return response;
        }

        // Retrieve friend user information
        UserEntity friendUser = getUserEntityByUserName(friendUserName);
        if (friendUser == null) {
            return createErrorResponse(response, "존재하지 않는 아이디입니다. 아이디를 다시 확인해주세요.");
        }

        // Check if they are already friends
        if (isAlreadyFriend(friendUser, response)) {
            return response;
        }

        // Process the friend request
        return processFriendRequest(ownUser, friendUser, response);
    }

    private boolean isAddingSelf(String friendUserName, UserEntity ownUser, AddFriendResponse response) {
        if (friendUserName.equals(ownUser.getUserUsedName())) {
            response.setMessage("나에게 친구 추가는 불가능합니다.");
            response.setSuccess(false);
            return true;
        }
        return false;
    }

    private boolean isAlreadyFriend(UserEntity friendUser, AddFriendResponse response) {
        if (friendRepository.findFriendByIdIsAccept(friendUser.getUserId()).orElse("Null").equals("ACCEPT")) {
            response.setSuccess(false);
            response.setMessage("이미 친구입니다.");
            return true;
        }
        return false;
    }

    private AddFriendResponse createErrorResponse(AddFriendResponse response, String message) {
        response.setMessage(message);
        response.setSuccess(false);
        return response;
    }

    private AddFriendResponse processFriendRequest(UserEntity ownUser, UserEntity friendUser, AddFriendResponse response) {
        if (friendRepository.findFriendById(friendUser.getUserId()).orElse(null) != null) {
            return repositorySetting(friendUser.getUserId(), friendUser.getNickname(), response);
        } else {
            return onlyOne(ownUser, friendUser, friendUser.getUserId(), response);
        }
    }


    public AddFriendResponse repositorySetting(UUID friendUserId, String nickName, AddFriendResponse response) {

        friendRepository.updateStatus(friendUserId, FriendEntity.statusType.ACCEPT);

        FriendEntity friendEntity = FriendEntity
                .builder()
                .ownUserId(globalService.myUserEntity())
                .friendUserId(friendUserId)
                .nickName(nickName)
                .createDate(String.valueOf(LocalDate.now()))
                .ChattingRoomId(UUID.randomUUID())
                .status(FriendEntity.statusType.ACCEPT)
                .build();

        friendRepository.save(friendEntity);
        eventRepository.updateEventFriendRequest(friendUserId, EventEntity.statusType.ACCEPT);

        //:TODO 확인필요
        // 파일을 저장한다.
        try (FileOutputStream stream = new FileOutputStream("C:\\chat\\chat" + friendEntity.getFriendId(), true)) {
            String nowTime = globalService.nowTime();
            stream.write(nickName.getBytes(StandardCharsets.UTF_8));
            stream.write("프랜드, 친구일자 :".getBytes(StandardCharsets.UTF_8));
            stream.write(nowTime.getBytes(StandardCharsets.UTF_8));
        } catch (Throwable e) {
            e.printStackTrace();
        }

        response.setSuccess(true);
        response.setMessage("상대가 보낸 요청이 이미 있기에, 친구 추가합니다.");
        return response;
    }

    public AddFriendResponse onlyOne(UserEntity ownUser, UserEntity friendUser, UUID friendUserId, AddFriendResponse response) {//동일한 요청 정보가 있다면? -> 저장x

        if (!eventRepository.checkIfDuplicatedEvent(ownUser.getUserId(), friendUserId)) {
            // 아니라면 내 친구 테이블에 추가
            FriendEntity friendEntity = FriendEntity
                    .builder()
                    .ownUserId(ownUser)
                    .friendUserId(friendUserId)
                    .nickName(friendUser.getNickname())
                    .createDate(String.valueOf(LocalDate.now()))
                    .ChattingRoomId(UUID.randomUUID())
                    .status(FriendEntity.statusType.WAITING).build();
            //이벤트테이블추가
            EventEntity eventEntity = EventEntity
                    .builder()
                    .ownUserId(ownUser)
                    .eventUserId(friendUserId)
                    .eventPurpose("Friend Request")
                    .eventName(EventEntity.eventType.RequestFriend)
                    .eventStatus(EventEntity.statusType.WAITING)
                    .createDate(String.valueOf(LocalDate.now()))
                    .build();

            friendRepository.save(friendEntity);
            eventRepository.save(eventEntity);
            webSokcetService.userAlarm(friendUserId, "친구요청");
            response.setSuccess(true);
            response.setMessage("친구 요청에 성공했습니다");
            return response;
        }
        response.setSuccess(false);
        response.setMessage("이미 요청한 유저입니다");
        return response;
    }


    public AddFriendResponse responseFriend(UUID friendUserName, String isAccept) {
        AddFriendResponse response = new AddFriendResponse();

        //요청 정보가 없다면 오류 반환
        FriendResponse friendResponse = friendRepository.findFriendById(friendUserName).orElse(null);
        if (friendResponse == null) {
            response.setMessage("올바르지 않은 요청입니다.");
            response.setSuccess(false);
            return response;
        }

        //거절이라면
        if (isAccept.equals("REJECT")) {
            //요청한 유저 친구목록에서 삭제
            friendRepository.deleteByOwnUserId(friendUserName);
            //이벤트 상태 거절로 변경
            eventRepository.updateEventFriendRequest(friendUserName, EventEntity.statusType.REJECT);
            webSokcetService.userAlarm(friendUserName, "친구거절");
            response.setMessage("친구 요청을 거절했습니다.");
            response.setSuccess(false);
            return response;
        } else {
            UserEntity friendUser = getUserEntityById(friendUserName);
            repositorySetting(friendUserName, friendUser.getNickname(), response);
            webSokcetService.userAlarm(friendUserName, "친구수락");
            response.setMessage("친구 요청을 수락했습니다.");
            response.setSuccess(true);
            return response;
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
}