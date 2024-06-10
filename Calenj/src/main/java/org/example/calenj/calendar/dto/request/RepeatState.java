package org.example.calenj.calendar.dto.request;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class RepeatState {
    private boolean repeat;
    //반복 기간
    private Timestamp repeatEnd;
    //반복 주기
    private int repeatNum;
    //반복 주기
    private String repeatOption;
}
