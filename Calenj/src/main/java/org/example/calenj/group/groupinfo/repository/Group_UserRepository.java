package org.example.calenj.group.groupinfo.repository;

import org.example.calenj.group.groupinfo.domain.Ids.GroupUserId;
import org.example.calenj.group.groupinfo.dto.response.GroupUserResponse;
import org.example.calenj.group.groupinfo.domain.GroupUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface Group_UserRepository extends JpaRepository<GroupUserEntity, GroupUserId> {
    //쿼리: GroupUserEntity 조회
    @Query("SELECT new org.example.calenj.group.groupinfo.dto.response.GroupUserResponse(gu.user.userEmail,gu.user.nickname, gu.role, gu.group_user_location) FROM Group_User gu WHERE gu.group.groupId = :groupId")
    List<GroupUserResponse> findGroupUsers(@Param("groupId") UUID groupId);

    // 그룹에 인원 참가
}
