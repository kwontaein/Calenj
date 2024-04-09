package org.example.calenj.Main.Service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.User.EventDTO;
import org.example.calenj.Main.DTO.User.FriendDTO;
import org.example.calenj.Main.Repository.EventRepository;
import org.example.calenj.Main.Repository.FriendRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.EventEntity;
import org.example.calenj.Main.domain.FriendEntity;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

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

    public List<FriendDTO> friendList() {
        return friendRepository.findFriendListById(globalService.extractFromSecurityContext().getUsername()).orElseThrow(() -> new RuntimeException("친구 목록이 비었습니다"));
    }

    public void requestFriend(String friendUserId) {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        //로그인된 유저 정보
        UserEntity ownUser = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        //친구추가할 유저 정보
        UserEntity friendUser = userRepository.findByUserEmail(friendUserId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        try {
            FriendDTO friendDTO = friendRepository.findFriendById(friendUserId).orElseThrow(() -> new RuntimeException("친구 요청이 없습니다"));
            //이미 상대가 요청했다면
            //상대 수락으로 변경 후 내 친구에 추가
            friendRepository.updateStatus(friendUserId, FriendEntity.statusType.ACCEPT);

            FriendEntity friendEntity = FriendEntity
                    .builder()
                    .ownUserId(ownUser)
                    .friendUserId(friendUserId)
                    .nickName(friendUser.getNickname())
                    .createDate(String.valueOf(LocalDate.now()))
                    .status(FriendEntity.statusType.ACCEPT)
                    .ChattingRoomId(friendDTO.getChattingRoomId())
                    .build();

            friendRepository.save(friendEntity);
            eventRepository.updateEventFriendRequest(friendUserId, "ACCEPT");

        } catch (Exception e) {
            //동일한 요청 정보가 있다면? -> 저장x
            if (!eventRepository.checkIfDuplicatedEvent(ownUser.getUserEmail(), friendUserId)) {
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
            }
        }
        //요청한 친구에게 알림 보내기(보류)
    }

    public void responseFriend(String friendUserId, String isAccept) {
        UserDetails userDetails = globalService.extractFromSecurityContext();

        //로그인된 유저 정보
        UserEntity ownUser = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        //친구추가할 유저 정보
        UserEntity friendUser = userRepository.findByUserEmail(friendUserId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        //이벤트 변경 후 친구테이블에 추가
        eventRepository.updateEventFriendRequest(friendUserId, "ACCEPT");

        FriendDTO friendDTO = friendRepository.findFriendById(friendUserId).orElseThrow(() -> new RuntimeException("친구 요청이 없습니다"));
        //거절이라면
        if (isAccept.equals("REJECT")) {
            //요청한 유저 친구목록에서 삭제
            friendRepository.deleteByOwnUserId(friendUserId);
        } else {// 거절이 아니라면
            //수락했다면
            //요청한 유저 상태 수락으로 변경
            friendRepository.updateStatus(friendUserId, FriendEntity.statusType.ACCEPT);

            //내 친구 테이블에도 추가
            FriendEntity friendEntity = FriendEntity
                    .builder()
                    .ownUserId(ownUser)
                    .friendUserId(friendUserId)
                    .nickName(friendUser.getNickname())
                    .createDate(String.valueOf(LocalDate.now()))
                    .status(FriendEntity.statusType.ACCEPT)
                    .ChattingRoomId(friendDTO.getChattingRoomId()).build();

            friendRepository.save(friendEntity);

        }
    }

    public List<EventDTO> myEvents(String userId) {
        return eventRepository.EventListById(userId).orElseThrow(() -> new RuntimeException(""));
    }

    //내가 받은 요청 목록
    public List<EventDTO> ResponseFriendList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        System.out.println(userDetails.getUsername());
        return eventRepository.ResponseEventListById(userDetails.getUsername()).orElseThrow(() -> new RuntimeException(""));
    }

    //내가 보낸 요청 목록
    public List<EventDTO> RequestFriendList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        System.out.println(userDetails.getUsername());
        return eventRepository.RequestEventListById(userDetails.getUsername()).orElseThrow(() -> new RuntimeException(""));
    }

}
