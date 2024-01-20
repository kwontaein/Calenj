package org.example.calenj.Main.domain.Group;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "Group_Schedule")
@Getter
@DiscriminatorValue("Group_Schedule") // 서브 테이블을 판별하기 위한 값
public class Group_ScheduleEntity extends Group_UserEntity {

}
