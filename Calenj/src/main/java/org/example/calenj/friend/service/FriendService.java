package org.example.calenj.friend.service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.event.domain.EventEntity;
import org.example.calenj.event.service.EventService;
import org.example.calenj.friend.domain.FriendEntity;
import org.example.calenj.friend.dto.request.FriendRequest;
import org.example.calenj.friend.dto.response.AddFriendResponse;
import org.example.calenj.friend.dto.response.FriendResponse;
import org.example.calenj.friend.repository.FriendRepository;
import org.example.calenj.global.service.GlobalService;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.user.dto.request.UserChatRequest;
import org.example.calenj.user.repository.UserRepository;
import org.example.calenj.user.service.UserService;
import org.example.calenj.websocket.service.WebSocketService;
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
    private final EventService eventService;
    private final UserService userService;


    private final FriendRepository friendRepository;
    private final UserRepository userRepository;
    private final WebSocketService webSocketService;


    /**
     * 이름으로 유저정보 가져오기
     *
     * @param userName 가져올 유저 사용자명
     * @return 유저정보
     */
    public UserEntity getUserEntityByUserName(String userName) {
        UserEntity userEntity = userRepository.findByUserUsedName(userName).orElse(null);
        return userEntity;
    }

    /**
     * 친구목록 가져오기
     *
     * @return 친구 목록
     */
    public List<FriendResponse> friendList() {
        UUID myUserID = UUID.fromString(globalService.extractFromSecurityContext().getUsername());
        return friendRepository.findFriendListById(myUserID).orElseThrow(() -> new RuntimeException("친구 목록이 비었습니다"));
    }

    /**
     * 친구 요청하기
     *
     * @param friendUserName
     * @return
     */
    public AddFriendResponse requestFriend(String friendUserName) {

        UserEntity ownUser = globalService.getUserEntity(null);

        // 나에게 초대는 불가
        if (friendUserName.equals(ownUser.getUserUsedName())) {
            return createErrorResponse("나에게 친구 추가는 불가능합니다.");
        }

        // 친구 유저 정보가 존재하는지 확인
        FriendResponse f = new FriendResponse();
        UserEntity friendUser = getUserEntityByUserName(friendUserName);

        if (friendUser != null) {
            f = friendRepository.findFriendById(friendUser.getUserId(), ownUser.getUserId()).orElse(null);
        }

        if (friendUser == null || (f != null && f.getStatus() == FriendEntity.statusType.BAN)) {
            return createErrorResponse("존재하지 않는 아이디입니다. 아이디를 다시 확인해주세요.");
        }

        // 이미 친구인 경우
        if (friendRepository.findFriendByIdIsAccept(friendUser.getUserId(), ownUser.getUserId()).orElse("Null").equals("ACCEPT")) {
            return createErrorResponse("이미 친구입니다.");
        }

        // 친구 요청
        return processFriendRequest(ownUser, friendUser);
    }

    /**
     * 검사요소 통과 못할시 에러로 반환
     *
     * @param message 에러 메세지
     * @return 응답
     */
    private AddFriendResponse createErrorResponse(String message) {
        return responseSetting(false, message, null);
    }

    /**
     * 요청 성공시 반환
     *
     * @param message 성공 메세지
     * @param userId  조회한 친구 아이디
     * @return 응답
     */
    private AddFriendResponse createSuccessResponse(String message, UUID userId) {
        return responseSetting(true, message, userId);
    }

    /**
     * 검사 통과 시 친구 요청 프로세스 진행
     *
     * @param ownUser    친구 요청한 유저 정보
     * @param friendUser 친구 요청 받은 유저 정보
     * @return 성공 / 실패시 응답 작성
     */
    private AddFriendResponse processFriendRequest(UserEntity ownUser, UserEntity friendUser) {
        FriendResponse friendResponse = friendRepository.findFriendById(friendUser.getUserId(), ownUser.getUserId()).orElse(null);
        if (friendResponse != null && friendResponse.getStatus() == FriendEntity.statusType.WAITING) {
            return createSuccessResponse("상대가 보낸 요청이 이미 있습니다. 친구 요청을 수락하시겠습니까?", friendUser.getUserId());
        } else {
            return finalProcess(ownUser, friendUser.getUserId());
        }
    }

    /**
     * 전부 통과 시 친구 요청을 위한 친구 정보 반환
     *
     * @param ownUser      친구 요청한 유저 정보
     * @param friendUserId 친구 요청 받은 유저 아이디
     * @return 성공 / 실패시 응답 작성
     */
    public AddFriendResponse finalProcess(UserEntity ownUser, UUID friendUserId) {//동일한 요청 정보가 있다면? -> 저장x
        if (!eventService.checkIfDuplicatedEvent(ownUser.getUserId(), friendUserId)) {
            return createSuccessResponse("친구 정보 조회에 성공했습니다.", friendUserId);
        }
        FriendResponse friendResponse = friendRepository.findFriendById(ownUser.getUserId(), friendUserId).orElse(null);
        if (friendResponse != null && friendResponse.getStatus() == FriendEntity.statusType.BAN) {
            return createErrorResponse("차단을 해제하고 요청해주세요");
        }
        return createErrorResponse("이미 요청한 유저입니다");
    }

    /**
     * 응답 정보 세팅
     *
     * @param isSuccess 친구 요청 과정 성공 / 실패 여부
     * @param message   전달할 메세지
     * @param userId    친구 요청할 유저 아이디
     * @return
     */
    public AddFriendResponse responseSetting(boolean isSuccess, String message, UUID userId) {
        AddFriendResponse response = new AddFriendResponse();
        response.setSuccess(isSuccess);
        response.setMessage(message);
        response.setUserId(userId);
        return response;
    }

    /**
     * 친구 요청 DB 저장
     *
     * @param friendUsedName 친구 사용자명
     * @param eventContent   이벤트 종류
     */
    public void saveFriend(String friendUsedName, String eventContent) {
        UserEntity ownUser = globalService.getUserEntity(null);
        UserEntity friendUser = getUserEntityByUserName(friendUsedName);

        FriendResponse friendResponse = friendRepository.findFriendById(ownUser.getUserId(), friendUser.getUserId()).orElse(null);
        if (friendResponse != null && friendResponse.getStatus() == FriendEntity.statusType.DELETE) {//삭제한 적이 있는 친구라면
            friendRepository.updateStatus(friendUser.getUserId(), ownUser.getUserId(), FriendEntity.statusType.WAITING);//대기 상태로 전환
            webSocketService.userAlarm(friendUser.getUserId(), "친구요청", friendResponse.getChattingRoomId().toString());
        } else {
            FriendEntity friendEntity = FriendEntity
                    .builder()
                    .ownUserId(ownUser)
                    .friendUserId(friendUser.getUserId())
                    .nickName(friendUser.getNickname())
                    .createDate(String.valueOf(LocalDate.now()))
                    .ChattingRoomId(UUID.randomUUID())
                    .status(FriendEntity.statusType.WAITING).build();
            friendRepository.save(friendEntity);
            webSocketService.userAlarm(friendUser.getUserId(), "친구요청", friendEntity.getChattingRoomId().toString());
        }
        //이벤트테이블추가
        eventService.createEvent(eventContent, ownUser, friendUser, "Friend Request");


    }

    /**
     * 친구 수락
     *
     * @param friendUserId 수락할 친구 아이디
     */
    public void acceptFriend(UUID friendUserId) {
        UUID myUserName = UUID.fromString(globalService.extractFromSecurityContext().getUsername());
        UserEntity friendUser = globalService.getUserEntity(friendUserId);
        FriendResponse friendResponse = friendRepository.findFriendById(friendUserId, myUserName).orElse(null);
        friendRepository.updateStatus(friendUserId, myUserName, FriendEntity.statusType.ACCEPT);

        FriendEntity friendEntity = FriendEntity
                .builder()
                .ownUserId(globalService.getUserEntity(null))
                .friendUserId(friendUserId)
                .nickName(friendUser.getNickname())
                .createDate(String.valueOf(LocalDate.now()))
                .ChattingRoomId(friendResponse.getChattingRoomId())
                .status(FriendEntity.statusType.ACCEPT)
                .build();

        friendRepository.save(friendEntity);
        eventService.updateEventState(friendUserId, EventEntity.statusType.ACCEPT, EventEntity.eventType.RequestFriend);

        try (FileOutputStream stream = new FileOutputStream("C:\\chat\\chat" + friendEntity.getChattingRoomId(), true)) {
            String Title = "시작라인$어서오세요 $ $ $ $\n";
            stream.write(Title.getBytes(StandardCharsets.UTF_8));

            UserChatRequest request = new UserChatRequest(UUID.randomUUID(), myUserName, friendUserId, friendEntity.getChattingRoomId(), false);
            userService.updateChatIsOpen(request);

            request = new UserChatRequest(UUID.randomUUID(), friendUserId, myUserName, friendEntity.getChattingRoomId(), false);
            userService.updateChatIsOpen(request);
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    /**
     * 친구 요청에 응답
     *
     * @param friendUserId 응답할 친구 아이디
     * @param isAccept     수락여부
     */
    public AddFriendResponse responseFriend(UUID friendUserId, String isAccept) {

        UUID myId = UUID.fromString(globalService.extractFromSecurityContext().getUsername());
        //요청 정보가 없다면 오류 반환
        FriendResponse friendResponse = friendRepository.findFriendById(friendUserId, myId).orElse(null);
        if (friendResponse == null) {
            return createErrorResponse("올바르지 않은 요청입니다.");
        }
        //거절이라면
        if (isAccept.equals("REJECT")) {
            //요청한 유저 친구목록에서 삭제
            friendRepository.deleteByOwnUserId(friendUserId, myId);
            //이벤트 상태 거절로 변경
            eventService.updateEventState(friendUserId, EventEntity.statusType.REJECT, EventEntity.eventType.RequestFriend);
            webSocketService.userAlarm(friendUserId, "친구거절", friendResponse.getChattingRoomId().toString());
            return createErrorResponse("친구 요청을 거절했습니다.");
        } else {
            acceptFriend(friendUserId);

            webSocketService.userAlarm(friendUserId, "친구수락", friendResponse.getChattingRoomId().toString());
            webSocketService.userAlarm(myId, "친구수락", friendResponse.getChattingRoomId().toString());
            return createSuccessResponse("친구 요청을 수락했습니다.", friendUserId);
        }
    }

    public void deleteFriend(FriendRequest request) {
        UUID myId = UUID.fromString(globalService.extractFromSecurityContext().getUsername());
        //상대한테서 내 정보 삭제
        friendRepository.deleteByOwnUserId(UUID.fromString(request.getFriendUserId()), myId);
        userService.deleteChat(myId, request.getFriendUserId());
        if (request.isBan()) {//차단이면 친구 삭제는 하지 않고 상태만 차단으로 변경 -> 재 친구 요청 불가
            friendRepository.updateStatus(myId, UUID.fromString(request.getFriendUserId()), FriendEntity.statusType.BAN);
        } else {//차단 아니고 삭제면 그냥 삭제
            friendRepository.deleteByOwnUserId(myId, UUID.fromString(request.getFriendUserId()));
        }
    }

    public List<FriendResponse> banList() {
        UUID myUserID = UUID.fromString(globalService.extractFromSecurityContext().getUsername());
        List<FriendResponse> responses = friendRepository.findBanListById(myUserID).orElseThrow(() -> new RuntimeException("차단 목록이 비었습니다"));
        return responses;
    }

    public void cancelBan(FriendRequest request) {//밴 취소시 친삭
        UUID myId = UUID.fromString(globalService.extractFromSecurityContext().getUsername());
        friendRepository.deleteByOwnUserId(myId, UUID.fromString(request.getFriendUserId()));
    }
}