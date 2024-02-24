package org.example.calenj.Main.domain.Group;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Entity(name = "Group_table")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "DTYPE") //자식테이블을 구분할 구분자 컬럼이름을 지어준다.
@ToString
public class GroupEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "group_id", columnDefinition = "BINARY(16)")
    private UUID groupid;

    @Column(name = "group_created")
    private String groupcreated;
    @Column(name = "group_title")
    private String grouptitle;
    @Column(name = "group_creater")
    private String groupcreater; //SecurityContext 에서 값 빼오기


    @OneToMany(mappedBy = "group") //사용하는 쪽이 one 대응이 many
    private List<Group_UserEntity> members;//Group_UserEntity에서 목록으로 가져오기
}




