package org.example.calenj.Main.domain.Group;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.example.calenj.Main.domain.UserEntity;

@Entity(name = "InviteCode")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder 를 사용
@Builder // 빌더
@Getter
@ToString
public class InviteCodeEntity {

    // 그룹아이디
    @Id
    private String inviteCode;

    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id", columnDefinition = "BINARY(16)")
    private GroupEntity group;

    // 초대자
    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "user_email", columnDefinition = "varchar(255)")
    private UserEntity user;


    // 사용 기간
    private String endDateTime;

    // 사용 횟수
    @Builder.Default
    private int useAbleCount = 0;

    // 사용 가능 횟수
    @Builder.Default
    private int maxUseAble = 999999;
}
