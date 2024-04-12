package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.DTO.Response.Group.GroupResponse;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, UUID> {

    //롬복의 @data 에 의한 생성자를 찾지 못함. + entity 의 name 을 지정한 경우 해당 name 값으로 select 해야함
    @Query("select new org.example.calenj.Main.DTO.Response.Group.GroupResponse(g.groupId, g.groupTitle) from Group_table g JOIN Group_User gu ON g.groupId = gu.group.groupId where gu.user.userEmail = :userEmail")
    Optional<List<GroupResponse>> findByUserEntity_UserEmail(@Param("userEmail") String userEmail); // No argument for named parameter ':groupCreater'

    Optional<GroupEntity> findByGroupId(@Param("groupId") UUID groupId);
    //서브 테이블 조회의 경우 쿼리 두개 사용 및 조인 전략을 사용해야 함

    // 첫 번째 쿼리: GroupEntity 조회
    @Query("SELECT new org.example.calenj.Main.DTO.Response.Group.GroupResponse(g.groupId, g.groupTitle, g.groupCreated ,g.groupCreater) FROM Group_table g WHERE g.groupId = :groupId")
    Optional<GroupResponse> findGroupById(@Param("groupId") UUID groupId);

    /*@Query("select g.groupid,g.grouptitle from Group_table g JOIN Group_User gu ON g.groupid = gu.group.groupid where gu.user.userEmail = :userEmail")
    Optional<List<GroupEntity>> findByUserEntity_UserEmail2(@Param("userEmail") String userEmail); // No argument for named parameter ':groupcreater'
    */
}
