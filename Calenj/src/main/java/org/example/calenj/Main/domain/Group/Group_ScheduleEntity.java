package org.example.calenj.Main.domain.Group;

import jakarta.persistence.Entity;
import lombok.*;

@Entity(name = "Group_Schedule")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
public class Group_ScheduleEntity extends Group_UserEntity {

}
