package org.example.calenj.Main.Repository;

import org.example.calenj.Main.DTO.Group.GroupDTO;
import org.example.calenj.Main.DTO.Group.GroupUserDTO;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Integer> {

    //롬복의 @data 에 의한 생성자를 찾지 못함. + entity의 name을 지정한 경우 해당 name 값으로 select 해야함
    @Query("select new org.example.calenj.Main.DTO.GroupDTO(g.groupId, g.groupTitle) from Group_table g JOIN Group_User gu ON g.groupId = gu.group.groupId where gu.user.userEmail = :userEmail")
    Optional<List<GroupDTO>> findByUserEntity_UserEmail(@Param("userEmail") String userEmail); // No argument for named parameter ':groupcreater'


    //서브 테이블 조회의 경우 쿼리 두개 사용 및 조인 전략을 사용해야 함 여기서는 두개의 쿼리 사용
    // 첫 번째 쿼리: GroupEntity 조회
    @Query("SELECT new org.example.calenj.Main.DTO.GroupDTO(g.groupId, g.groupTitle, g.groupCreated ,g.groupCreater) FROM Group_table g WHERE g.groupId = :groupId")
    Optional<GroupDTO> findGroupById(@Param("groupId") UUID groupId);

    // 두 번째 쿼리: GroupUserEntity 조회
    @Query("SELECT new org.example.calenj.Main.DTO.GroupUserDTO(gu.user.nickname, gu.role, gu.group_user_location) FROM Group_User gu WHERE gu.group.groupId = :groupId")
    List<GroupUserDTO> findGroupUsers(@Param("groupId") UUID groupId);

}
