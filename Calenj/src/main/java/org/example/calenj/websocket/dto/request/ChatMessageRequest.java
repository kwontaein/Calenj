package org.example.calenj.websocket.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.calenj.user.domain.UserEntity;

import java.util.UUID;
import java.util.stream.Stream;

@Data
public class ChatMessageRequest {
    private UUID userId;
    private fileType state;
    private String param;
    private String message;
    private int endPoint;
    private String sendDate;
    private UUID chatUUID;
    private int nowLine;
    private int fileSize;
    private String messageType;

    @Getter
    @RequiredArgsConstructor
    public enum fileType { //enum을 활용한 권한종류 설정
        ALARM("내 알림반환"),//PUBLISH
        READ("파일읽기"),//방 들어가면 읽기
        SEND("메시지 전송"),//메세지 전송
        RELOAD("추가적인 파일 내용 로드"),
        ENDPOINT("엔드포인트 찍기"),//방 나갈때
        ONLINE("온라인 유저 목록 반환");//방 나갈때

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
