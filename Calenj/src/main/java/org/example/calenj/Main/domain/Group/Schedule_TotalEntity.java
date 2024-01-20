package org.example.calenj.Main.domain.Group;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "Schedule_Total")
@Getter
@DiscriminatorValue("Schedule_Total") // 서브 테이블을 판별하기 위한 값
public class Schedule_TotalEntity extends GroupEntity {

    private long group_id;
    private boolean period;
    private String total_result;
    private String agreed_user;
}
