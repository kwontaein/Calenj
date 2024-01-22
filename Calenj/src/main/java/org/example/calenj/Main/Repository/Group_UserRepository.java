package org.example.calenj.Main.Repository;

import org.example.calenj.Main.domain.Group.Group_UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Group_UserRepository extends JpaRepository<Group_UserEntity, Integer> {
}
