package org.example.calenj.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)// auto_increment(자동 증가 int형) -> 자동적으로 생성
    private int userid; //-> 얜 그냥 구분하기 위한 값

    @Column
    private String username;


    //커밋용 주석 2
}
