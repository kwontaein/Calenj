package org.example.calenj.Main.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
public class User {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private int user_id;

    private String account_id;
    private String user_password;
    private String user_join_date;
    private String user_email;
    private String user_phone;
    private String user_roll;
    private boolean naver_login;
    private boolean kakao_login;
    private boolean withdrawed;

    @Override
    public String toString() {
        return "User{" +
                "user_id=" + user_id +
                ", account_id='" + account_id + '\'' +
                ", user_password='" + user_password + '\'' +
                ", user_join_date='" + user_join_date + '\'' +
                ", user_email='" + user_email + '\'' +
                ", user_phone='" + user_phone + '\'' +
                ", user_roll='" + user_roll + '\'' +
                ", naver_login=" + naver_login +
                ", kakao_login=" + kakao_login +
                ", withdrawed=" + withdrawed +
                '}';
    }
}
