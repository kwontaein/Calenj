package org.example.calenj.Main.domain.Group;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "Group_User")
@Getter
@DiscriminatorValue("Group_User") // 서브 테이블을 판별하기 위한 값
public class Group_UserEntity extends GroupEntity {

}
