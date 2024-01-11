package org.example.calenj.Main.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.processing.Generated;

@Entity //테이블 어노테이션
@Getter
@Setter
public class Test2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private int userid; //-> 얜 그냥 구분하기 위한 값

    @Column
    private String account_id;
    private String user_password;

}
