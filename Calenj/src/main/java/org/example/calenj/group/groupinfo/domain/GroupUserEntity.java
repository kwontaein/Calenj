package org.example.calenj.group.groupinfo.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.user.domain.UserEntity;
import org.example.calenj.group.groupinfo.domain.Ids.GroupUserId;

import java.util.stream.Stream;

@Entity(name = "Group_User")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@DiscriminatorValue("Group_User") // 서브 테이블을 판별하기 위한 값
@IdClass(GroupUserId.class)
public class GroupUserEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id", columnDefinition = "BINARY(16)")
    // 외래 키에 대한 참조 필드 지정
    private GroupEntity group;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "user_email", columnDefinition = "varchar(255)")
    // 외래 키에 대한 참조 필드 지정
    private UserEntity user;

    private GroupRoleType role;
    private String group_user_location;

    @Getter
    @RequiredArgsConstructor
    public enum GroupRoleType { //enum을 활용한 권한종류 설정
        Member("그룹원"),
        Host("그룹장"),
        Group_MANAGER("그룹 관리자");

        private final String role;

        //user_role 유효성 검사
        @JsonCreator
        public static GroupUserEntity.GroupRoleType userRoleParsing(String inputValue) {

            return Stream.of(GroupUserEntity.GroupRoleType.values())
                    .filter(roleType -> roleType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(Member);
        }

    }


}
