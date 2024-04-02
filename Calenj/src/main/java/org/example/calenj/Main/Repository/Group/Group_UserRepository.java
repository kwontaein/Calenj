package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.DTO.Group.GroupUserDTO;
import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface Group_UserRepository extends JpaRepository<GroupUserEntity, UUID> {
    //쿼리: GroupUserEntity 조회
    @Query("SELECT new org.example.calenj.Main.DTO.Group.GroupUserDTO(gu.user.userEmail,gu.user.nickname,gu.user.isOnline, gu.role, gu.group_user_location) FROM Group_User gu WHERE gu.group.groupId = :groupId")
    List<GroupUserDTO> findGroupUsers(@Param("groupId") UUID groupId);

    // 그룹에 인원 참가
}
