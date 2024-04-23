package org.example.calenj.Main.Service;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Response.User.EventResponse;
import org.example.calenj.Main.DTO.Response.User.FriendResponse;
import org.example.calenj.Main.Repository.EventRepository;
import org.example.calenj.Main.Repository.FriendRepository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.EventEntity;
import org.example.calenj.Main.domain.FriendEntity;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class FriendService {
    private final GlobalService globalService;
    private final FriendRepository friendRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;


    public List<FriendResponse> friendList() {
        return friendRepository.findFriendListById(globalService.extractFromSecurityContext().getUsername()).orElseThrow(() -> new RuntimeException("친구 목록이 비었습니다"));
    }

    public String requestFriend(String friendUserId) {
        UserDetails userDetails = globalService.extractFromSecurityContext();


        UserEntity userEntity = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        if (friendUserId.equals(userDetails.getUsername())) {
            System.out.println("나에게 친구 추가는 불가능합니다.");
            return "나에게 친구 추가는 불가능합니다.";
        }

        //로그인된 유저 정보
        // 로그인된 유저 정보 조회
        Optional<UserEntity> ownUserOptional = userRepository.findByUserEmail(userDetails.getUsername());

        // 친구 추가할 유저 정보 조회
        Optional<UserEntity> friendUserOptional = userRepository.findByUserEmail(friendUserId);

        // 로그인된 유저가 존재하지 않는 경우
        if (ownUserOptional.isEmpty()) {
            return "내 정보 인증에 문제가 생겼습니다.";
        }
        // 친구 추가할 유저가 존재하지 않는 경우
        if (friendUserOptional.isEmpty()) {
            return "존재하지 않는 유저입니다.";
        }

        // 유저 정보 할당
        UserEntity ownUser = ownUserOptional.get();
        UserEntity friendUser = friendUserOptional.get();

        //상대방 요청 정보가 있다면
        Optional<FriendResponse> friendResponseOptional = friendRepository.findFriendById(friendUserId);

        if (friendResponseOptional.isPresent()) {
            FriendResponse friendResponse = friendResponseOptional.get();
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
                    .ChattingRoomId(friendResponse.getChattingRoomId())
                    .build();

            friendRepository.save(friendEntity);
            eventRepository.updateEventFriendRequest(friendUserId, 1);


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

            return "상대가 보낸 요청이 이미 있기에, 친구 추가합니다.";
        } else {
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
                return "친구 요청에 성공했습니다";
            }
            return "이미 요청한 유저입니다";
        }
        //요청한 친구에게 알림 보내기(보류)
    }

    public String responseFriend(String friendUserId, int isAccept) {
        UserDetails userDetails = globalService.extractFromSecurityContext();

        UserEntity userEntity = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));

        //로그인된 유저 정보
        UserEntity ownUser = userRepository.findByUserEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        //친구추가할 유저 정보
        UserEntity friendUser = userRepository.findByUserEmail(friendUserId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        //요청 정보가 없다면 오류 반환
        FriendResponse friendResponse = friendRepository.findFriendById(friendUserId).orElseThrow(() -> new RuntimeException("친구 요청이 없습니다"));

        //거절이라면
        if (isAccept == 2) {
            //요청한 유저 친구목록에서 삭제
            friendRepository.deleteByOwnUserId(friendUserId);
            //이벤트 상태 거절로 변경
            eventRepository.updateEventFriendRequest(friendUserId, 2);
            return "친구 요청을 거절했습니다.";
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
                    .ChattingRoomId(friendResponse.getChattingRoomId()).build();

            friendRepository.save(friendEntity);
            //이벤트 상태 수락으로 변경
            eventRepository.updateEventFriendRequest(friendUserId, 1);

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
            return "친구 요청을 수락했습니다.";
        }
    }

    public List<EventResponse> myEvents(String userId) {
        return eventRepository.EventListById(userId).orElseThrow(() -> new RuntimeException(""));
    }

    //내가 받은 요청 목록
    public List<EventResponse> ResponseFriendList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        System.out.println(userDetails.getUsername());
        return eventRepository.ResponseEventListById(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("요청받은 목록이 존재하지 않습니다."));
    }

    //내가 보낸 요청 목록
    public List<EventResponse> RequestFriendList() {
        UserDetails userDetails = globalService.extractFromSecurityContext();
        System.out.println(userDetails.getUsername());
        return eventRepository.RequestEventListById(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("요청한 목록이 존재하지 않습니다."));
    }

}
