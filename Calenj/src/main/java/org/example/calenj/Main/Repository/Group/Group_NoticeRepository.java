package org.example.calenj.Main.Repository.Group;

import jakarta.persistence.Convert;
import jakarta.persistence.Converter;
import org.example.calenj.Main.DTO.Group.GroupDTO;
import org.example.calenj.Main.DTO.Group.GroupNoticeDTO;
import org.example.calenj.Main.domain.Group.GroupNoticeEntity;
import org.example.calenj.Main.helper.StringListConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface Group_NoticeRepository extends JpaRepository<GroupNoticeEntity, UUID> {
    // 쿼리: GroupNoticeEntity 조회
    @Query("SELECT new org.example.calenj.Main.DTO.Group.GroupNoticeDTO(gn.noticeId, gn.noticeContent, gn.noticeCreater, gn.noticeCreated) FROM Group_Notice gn WHERE gn.group.groupId = :groupId")
    Optional<List<GroupNoticeDTO>> findNoticeByGroupId(@Param("groupId") UUID groupId);

    // 쿼리 : noticeId로 조회
    //Group_table g JOIN Group_User gu ON g.groupId = gu.group.groupId where gu.user.userEmail = :userEmail")
    @Query("SELECT new org.example.calenj.Main.DTO.Group.GroupNoticeDTO(gn.noticeId, gn.noticeContent, gn.noticeCreater, gn.noticeCreated, gn.noticeWatcher) FROM Group_Notice gn WHERE gn.noticeId = :noticeId")
    Optional<GroupNoticeDTO> findByNoticeId(@Param("noticeId") UUID noticeId);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함

    @Query(value = "UPDATE Group_Notice SET notice_watcher = :noticeWatcher WHERE notice_id = :noticeId", nativeQuery = true)
    void updateNoticeWatcher(@Param("noticeWatcher") String noticeWatcher, @Param("noticeId") UUID noticeId);
}
