package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.Main.domain.UserEntity;

@Entity(name = "InviteCode")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder 를 사용
@Builder // 빌더
@Getter
//자식테이블을 구분할 구분자 컬럼이름을 지어준다.
@DiscriminatorColumn(name = "DTYPE")
@ToString
public class InviteCodeEntity {

    //    그룹아이디
    @Id
    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id", columnDefinition = "BINARY(16)")
    private GroupEntity group;

    //    초대 코드
    private String inviteCode;

    //    초대자
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", columnDefinition = "varchar(255)")
    private UserEntity user;

    //    사용 기간
    private String endDateTime;

    //    사용 횟수
    private String useAbleCount;

    //    사용 가능 횟수
    private String maxUseAble;
}
