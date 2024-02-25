package org.example.calenj.Main.Repository;

import org.example.calenj.Main.DTO.GroupDTO;
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
    @Query("select new org.example.calenj.Main.DTO.GroupDTO(g.groupid, g.grouptitle) from Group_table g JOIN Group_User gu ON g.groupid = gu.group.groupid where gu.user.userEmail = :userEmail")
    Optional<List<GroupDTO>> findByUserEntity_UserEmail(@Param("userEmail") String userEmail); // No argument for named parameter ':groupcreater'


    @Query("select g.groupid,g.grouptitle from Group_table g JOIN Group_User gu ON g.groupid = gu.group.groupid where gu.user.userEmail = :userEmail")
    Optional<List<GroupEntity>> findByUserEntity_UserEmail2(@Param("userEmail") String userEmail); // No argument for named parameter ':groupcreater'


    Optional<GroupEntity> findByGroupid(UUID groupid);

}
