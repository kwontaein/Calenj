package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.DTO.Group.GroupNoticeDTO;
import org.example.calenj.Main.domain.Group.GroupNoticeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface Group_NoticeRepository extends JpaRepository<GroupNoticeEntity, UUID> {
    // 쿼리: GroupNoticeEntity 조회
    @Query("SELECT new org.example.calenj.Main.DTO.Group.GroupNoticeDTO(gn.noticeTitle, gn.noticeContent, gn.noticeWatcher, gn.noticeCreater, gn.noticeCreated) FROM Group_Notice gn WHERE gn.group.groupId = :groupId")
    List<GroupNoticeDTO> findGroupNotice(@Param("groupId") UUID groupId);
}
