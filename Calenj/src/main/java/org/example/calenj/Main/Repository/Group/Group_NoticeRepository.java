package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.domain.Group.GroupNoticeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface Group_NoticeRepository extends JpaRepository<GroupNoticeEntity, UUID> {
}
