//package org.example.calenj.Main.domain.Group;
//
//import jakarta.persistence.*;
//import lombok.*;
//import org.example.calenj.Main.domain.Group.Ids.GroupVoteId;
//import org.hibernate.annotations.GenericGenerator;
//
//import java.util.UUID;
//
//@Entity(name = "Group_Schedule")
//@Getter
//@Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
//@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
//@Builder(builderMethodName = "GroupSecheduleBuilder") // 자식 클래스에서 builder() 메서드 이름을 변경
//@IdClass(GroupVoteId.class)
//public class GroupScheduleEntity {
//
//    @Id
//    @GeneratedValue(generator = "uuid2")
//    @GenericGenerator(name = "uuid2", strategy = "uuid2")
//    @Column(nullable = false, unique = true, name = "group_schedule_id", columnDefinition = "BINARY(16)")
//    private UUID groupScheduleId;
//
//    @Id
//    @ManyToOne
//    @JoinColumns({
//            @JoinColumn(name = "group_id", referencedColumnName = "group_id"),
//            @JoinColumn(name = "user_email", referencedColumnName = "user_email")
//    })
//    private GroupUserEntity groupUser;
//
//    @Column(name = "group_schedule_title")
//    private String groupScheduleTitle;
//    @Column(name = "group_schedule_content")
//    private String groupScheduleContent;
//    @Column(name = "group_schedule_location")
//    private String groupScheduleLocation;
//
//}
