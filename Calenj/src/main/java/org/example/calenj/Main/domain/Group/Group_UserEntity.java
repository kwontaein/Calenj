package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.Getter;
import org.example.calenj.Main.domain.UserEntity;

@Entity(name = "Group_User")
@Getter
@DiscriminatorValue("Group_User") // 서브 테이블을 판별하기 위한 값
public class Group_UserEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "group_id")
    private GroupEntity group;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String role;
    private String group_user_location;
}
