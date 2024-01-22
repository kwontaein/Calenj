package org.example.calenj.Main.DTO;

import lombok.Data;
import org.example.calenj.Main.domain.UserEntity;

//DTO를 Entity와 별개로 따로 생성하는 이유
//1 DTO는 데이터 전송을 위한 객체로, 주로 클라이언트와 서버 간의 통신에 사용
//2 DTO는 클라이언트가 필요로 하는 데이터만을 포함하도록 설계되어 있기 때문에, 불필요한 데이터를 전송하는 것을 방지하고 성능을 최적화할 수 있다
//3 DTO는 주로 비즈니스 로직이나 클라이언트에 필요한 데이터를 중심으로 설계되어 있으며, 데이터베이스 변경에 덜 민감
//4 Entity 클래스는 애플리케이션 내에서 중요한 정보를 담고 있을 수 있다
//5 Entity 클래스와 DTO 클래스를 분리하면 각각의 클래스가 자신의 책임을 가지게 되어 코드의 의도를 명확하게 유지 가능
@Data
public class UserDTO {
    private String accountid;
    private String user_password;
    private String user_email;
    private String user_phone;
    private String user_join_date;
    private String user_role;

    public UserEntity toEntity() {
        return UserEntity.builder()
                .accountid(accountid)
                .user_password(user_password)
                .user_email(user_email)
                .user_phone(user_phone)
                .user_join_date(user_join_date)
                .user_role(user_role)
                .build();
    }
}
