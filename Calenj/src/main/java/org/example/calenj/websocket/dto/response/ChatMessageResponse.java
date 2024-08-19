package org.example.calenj.websocket.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.*;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.websocket.dto.request.ChatMessageRequest;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Stream;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageResponse {
    private UUID userId;
    private ChatMessageRequest.fileType state;
    private String param;
    private int endPoint;
    private Set<String> onlineUserList;
    private String target;
    private List<String> images;
    private List<MessageResponse> message;
    private UUID receivedUUID;

    @Getter
    @RequiredArgsConstructor
    public enum fileType { //enum을 활용한 권한종류 설정
        ALARM("내 알림반환"),//PUBLISH
        READ("파일읽기"),//방 들어가면 읽기
        SEND("메시지 전송"),//메세지 전송
        RELOAD("추가적인 파일 내용 로드"),
        ENDPOINT("엔드포인트 찍기"),//방 나갈때
        ONLINE("온라인 유저 목록 반환"),//온라인
        OFFLINE("온라인 유저 목록 반환");//오프라인

        private final String role;

        //user_role 유효성 검사
        @JsonCreator
        public static UserEntity.RoleType userRoleParsing(String inputValue) {
            return Stream.of(UserEntity.RoleType.values())
                    .filter(roleType -> roleType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(null);
        }
    }
}
