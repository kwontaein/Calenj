package org.example.calenj.friend.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.event.domain.EventEntity;
import org.example.calenj.event.dto.response.EventResponse;
import org.example.calenj.event.repository.EventRepository;
import org.example.calenj.friend.domain.FriendEntity;
import org.example.calenj.friend.dto.response.FriendResponse;
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
        UserEntity userEntity = userRepository.findByUserUsedName(userName).orElseThrow(() -> new RuntimeException());
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

    public String requestFriend(String friendUserName) {

        // 로그인된 유저 정보 조회
        UserEntity ownUser = globalService.myUserEntity();

        if (friendUserName.equals(ownUser.getUsername())) {
            return "나에게 친구 추가는 불가능합니다.";
        }

        // 친구 추가할 유저 정보 조회
        UserEntity friendUser = getUserEntityByUserName(friendUserName);

        if (friendRepository.findFriendById(friendUser.getUserId()).orElse(null) != null) {
            return repositorySetting(friendUser.getUserId(), friendUser.getNickname());
        } else {
            return onlyOne(ownUser, friendUser, friendUser.getUserId());
        }
    }

    public String repositorySetting(UUID friendUserId, String nickName) {

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

        return "상대가 보낸 요청이 이미 있기에, 친구 추가합니다.";
    }

    public String onlyOne(UserEntity ownUser, UserEntity friendUser, UUID friendUserId) {//동일한 요청 정보가 있다면? -> 저장x
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
            return "친구 요청에 성공했습니다";
        }
        return "이미 요청한 유저입니다";
    }


    public String responseFriend(UUID friendUserName, String isAccept) {
        //요청 정보가 없다면 오류 반환
        FriendResponse friendResponse = friendRepository.findFriendById(friendUserName).orElse(null);
        if (friendResponse == null) {
            return "올바르지 않은 요청입니다.";
        }
        //거절이라면
        if (isAccept.equals("REJECT")) {
            //요청한 유저 친구목록에서 삭제
            friendRepository.deleteByOwnUserId(friendUserName);
            //이벤트 상태 거절로 변경
            eventRepository.updateEventFriendRequest(friendUserName, EventEntity.statusType.REJECT);
            webSokcetService.userAlarm(friendUserName, "친구거절");
            return "친구 요청을 거절했습니다.";
        } else {
            UserEntity friendUser = getUserEntityById(friendUserName);
            repositorySetting(friendUserName, friendUser.getNickname());
            webSokcetService.userAlarm(friendUserName, "친구수락");
            return "친구 요청을 수락했습니다.";
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