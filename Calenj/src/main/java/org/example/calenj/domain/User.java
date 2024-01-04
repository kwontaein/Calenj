package org.example.calenj.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter // Getter, Setter은 Lombok 라이브러리이다. 각 변수의 Getter, Setter Method를 만들어준다.
@Setter
public class User {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private int user_id;

    @Column
    private String user_password;
    @Column
    private String user_join_date;
    @Column
    private String user_email;
    @Column
    private String user_phone;
    @Column
    private String user_roll;
    @Column
    private boolean naver_login;
    @Column
    private boolean kakao_login;
    @Column
    private boolean withdrawed;
}
