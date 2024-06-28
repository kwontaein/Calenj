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
    @Query("SELECT new org.example.calenj.group.groupinfo.dto.response.GroupUserResponse(gu.user.userEmail,gu.user.nickname, gu.role, gu.group_user_location, gu.user.userId) FROM Group_User gu WHERE gu.group.groupId = :groupId")
    List<GroupUserResponse> findGroupUsers(@Param("groupId") UUID groupId);


    //같이 속한 그룹 표시
    @Query("SELECT gu1.group.groupId\n" +
            "FROM Group_User gu1\n" +
            "INNER JOIN Group_User gu2 ON gu1.group.groupId = gu2.group.groupId\n" +
            "WHERE gu1.user.userId = :myUserId AND gu2.user.userId = :FriendUserId ")
    List<String> findGroupIds(@Param("FriendUserId") UUID FriendUserId, @Param("myUserId") UUID myUserId);
}
