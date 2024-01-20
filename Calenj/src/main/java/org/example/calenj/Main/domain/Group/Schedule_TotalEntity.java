package org.example.calenj.Main.domain.Group;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.*;

@Entity(name = "Group")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@PrimaryKeyJoinColumn(name = "group_id")
public class Schedule_TotalEntity extends GroupEntity {

    private long group_id;
    private boolean period;
    private String total_result;
    private String agreed_user;
}
