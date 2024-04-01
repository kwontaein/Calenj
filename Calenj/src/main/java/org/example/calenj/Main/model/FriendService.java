package org.example.calenj.Main.model;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.EventDTO;
import org.example.calenj.Main.DTO.FriendDTO;
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


@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final GlobalService globalService;

    public List<FriendDTO> friendList(String userId) {
        return friendRepository.findFriendListById(userId).orElseThrow(() -> new RuntimeException("친구 목록을 불러오는데 실패했습니다."));
    }

    public void requestFriend(String userId) {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        //친구테이블 추가

        //로그인된 유저 정보
        UserEntity ownUser = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));
        //친구추가할 유저 정보
        UserEntity friendUser = userRepository.findByUserEmail(userId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        FriendEntity friendEntity = FriendEntity
                .builder()
                .ownUserId(ownUser)
                .friendUserId(userId)
                .nickName(friendUser.getNickname())
                .createDate(String.valueOf(LocalDate.now()))
                .status(FriendEntity.statusType.WAITING).build();

        //이벤트테이블추가
        EventEntity eventEntity = EventEntity
                .builder()
                .ownUserId(ownUser)
                .eventUserId(userId)
                .eventPurpose("Friend Request")
                .eventName(EventEntity.eventType.RequestFriend)
                .eventStatus(EventEntity.statusType.WAITING)
                .createDate(String.valueOf(LocalDate.now()))
                .build();

        friendRepository.save(friendEntity);
        eventRepository.save(eventEntity);
        //요청한 친구에게 알림 보내기(보류)
    }

    public void responseFriend(String requestUserId, String isAccept) {
        UserDetails userDetails = globalService.extractFromSecurityContext();

        //로그인된 유저 정보
        UserEntity ownUser = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        //친구추가할 유저 정보
        UserEntity friendUser = userRepository.findByUserEmail(requestUserId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        //이벤트 변경 후 친구테이블에 추가
        eventRepository.updateEventFriendRequest(requestUserId, isAccept);

        //거절이라면
        if (isAccept.equals("REJECT")) {
            //요청한 유저 친구목록에서 삭제
            friendRepository.deleteByOwnUserId(requestUserId);
        } else {
            //수락했다면
            //요청한 유저 상태 수락으로 변경 후
            friendRepository.updateStatus(requestUserId, FriendEntity.statusType.ACCEPT);
            // 내 친구 테이블에도 추가
            FriendEntity friendEntity = FriendEntity
                    .builder()
                    .ownUserId(ownUser)
                    .friendUserId(requestUserId)
                    .nickName(friendUser.getNickname())
                    .createDate(String.valueOf(LocalDate.now()))
                    .status(FriendEntity.statusType.ACCEPT).build();

            friendRepository.save(friendEntity);
        }
    }

    public List<EventDTO> myEvents(String userId) {
        return eventRepository.EventListById(userId).orElseThrow(() -> new RuntimeException(""));
    }
}
