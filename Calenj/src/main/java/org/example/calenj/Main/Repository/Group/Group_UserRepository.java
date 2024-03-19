package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface Group_UserRepository extends JpaRepository<GroupUserEntity, UUID> {

    // 그룹에 인원 참가
}
