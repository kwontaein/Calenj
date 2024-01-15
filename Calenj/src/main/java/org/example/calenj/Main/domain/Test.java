package org.example.calenj.Main.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)    // auto_increment(자동 증가 int형) -> 자동적으로 생성
    private int userid;                         //-> 얜 그냥 구분하기 위한 값

    @Column
    private String userName;
    @Column
    private  String userPw;

    //확인용 주석
    @Override
    public String toString() {
        return "Test{" +
                "userid=" + userid +
                ", username='" + userName + '\'' +
                '}';
    }

    //커밋용 주석 2
    //내가 수정함
}
