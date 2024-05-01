package org.example.calenj.group.groupinfo.repository;

import org.example.calenj.group.groupinfo.dto.response.InviteCodeResponse;
import org.example.calenj.group.groupinfo.domain.InviteCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface InviteCodeRepository extends JpaRepository<InviteCodeEntity, String> {
    //초대받은 정보 / 그룹이름 , 초대자 , 현재 인원수
    @Query("SELECT new org.example.calenj.group.groupinfo.dto.response.InviteCodeResponse(ic.group.groupId,ic.group.groupTitle,ic.user.nickname,ic.endDateTime,ic.useAbleCount,ic.maxUseAble) FROM InviteCode ic WHERE ic.inviteCode = :inviteCode GROUP BY ic.group.groupTitle, ic.user.nickname, ic.endDateTime")
    Optional<InviteCodeResponse> findByInviteCode(@Param("inviteCode") String inviteCode);

    @Query("SELECT new org.example.calenj.group.groupinfo.dto.response.InviteCodeResponse(ic.user.nickname,ic.inviteCode,ic.endDateTime,ic.useAbleCount) FROM InviteCode ic WHERE ic.group.groupId = :groupId ")
    Optional<InviteCodeResponse> findByGroupId(@Param("groupId") UUID groupId);

    @Query("SELECT COUNT(m) FROM InviteCode ic JOIN ic.group.members m WHERE ic.inviteCode = :inviteCode")
    Optional<Integer> memberCount(@Param("inviteCode") String inviteCode);

}
