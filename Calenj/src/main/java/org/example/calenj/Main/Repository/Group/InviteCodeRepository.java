package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.DTO.Group.InviteCodeDTO;
import org.example.calenj.Main.domain.Group.InviteCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface InviteCodeRepository extends JpaRepository<InviteCodeEntity, String> {
    //초대받은 정보 / 그룹이름 , 초대자 , 현재 인원수
    @Query("SELECT new org.example.calenj.Main.DTO.Group.InviteCodeDTO(ic.group.groupId,ic.group.groupTitle,ic.user.nickname,ic.endDateTime,ic.useAbleCount,ic.maxUseAble) FROM InviteCode ic WHERE ic.inviteCode = :inviteCode GROUP BY ic.group.groupTitle, ic.user.nickname, ic.endDateTime")
    Optional<InviteCodeDTO> findByInviteCode(@Param("inviteCode") String inviteCode);

    @Query("SELECT new org.example.calenj.Main.DTO.Group.InviteCodeDTO(ic.user.nickname,ic.inviteCode,ic.endDateTime,ic.useAbleCount) FROM InviteCode ic WHERE ic.group.groupId = :groupId ")
    Optional<InviteCodeDTO> findByGroupId(@Param("groupId") UUID groupId);

    @Query("SELECT COUNT(m) FROM InviteCode ic JOIN ic.group.members m WHERE ic.inviteCode = :inviteCode")
    Optional<Integer> memberCount(@Param("inviteCode") String inviteCode);

    //현재 온라인인 유저 정보
    @Query("SELECT count(ic.user.isOnline) from InviteCode ic where ic.inviteCode =:inviteCode AND ic.user.isOnline = 'ONLINE'")
    Optional<Integer> onlineUserCount(@Param("inviteCode") String inviteCode);
}
