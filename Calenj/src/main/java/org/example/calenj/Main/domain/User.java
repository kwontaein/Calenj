package org.example.calenj.Main.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter // Getter, Setter은 Lombok 라이브러리이다. 각 변수의 Getter, Setter Method를 만들어준다.
@Setter
public class User {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true ,name = "user_id")
    private int user_id;

    @Column(name = "account_id")
    private String account_id;
    @Column(name = "user_password")
    private String user_password;
    @Column(name = "user_join_date")
    private String user_join_date;
    @Column(name = "user_email")
    private String user_email;
    @Column(name = "user_phone")
    private String user_phone;
    @Column(name = "user_roll")
    private String user_roll;
    @Column(name = "naver_login")
    private boolean naver_login;
    @Column(name = "kakao_login")
    private boolean kakao_login;
    @Column(name = "withdrawed")
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
