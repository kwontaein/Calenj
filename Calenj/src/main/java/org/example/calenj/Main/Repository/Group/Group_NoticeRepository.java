package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.domain.Group.GroupEntity;
import org.example.calenj.Main.domain.Group.GroupNoticeEntity;
import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface Group_NoticeRepository extends JpaRepository<GroupNoticeEntity, UUID> {
}
