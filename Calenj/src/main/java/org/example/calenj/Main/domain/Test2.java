package org.example.calenj.Main.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
public class Test2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private int userid; //-> 얜 그냥 구분하기 위한 값

    @Column
    private String account_id;
    private String user_password;

    @Override
    public String toString() {
        return "Test2{" +
                "userid=" + userid +
                ", account_id='" + account_id + '\'' +
                ", user_password='" + user_password + '\'' +
                '}';
    }
}
