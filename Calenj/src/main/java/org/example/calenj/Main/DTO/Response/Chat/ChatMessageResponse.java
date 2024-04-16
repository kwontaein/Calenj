package org.example.calenj.Main.DTO.Response.Chat;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.Request.Chat.ChatMessageRequest;
import org.example.calenj.Main.domain.UserEntity;

import java.util.List;
import java.util.stream.Stream;

@Data
public class ChatMessageResponse {
    private String userEmail;
    private ChatMessageRequest.fileType state;
    private String param;
    private String nickName;
    private List<String> message;
    private int endPoint;
    private String sendDate;

    @Getter
    @RequiredArgsConstructor
    public enum fileType { //enum을 활용한 권한종류 설정
        ALARM("내 알림반환"),//PUBLISH
        READ("파일읽기"),//방 들어가면 읽기
        SEND("메시지 전송"),//메세지 전송
        ENDPOINT("엔드포인트 찍기");//방 나갈때

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
