package org.example.calenj.Main.Repository;

import org.example.calenj.Main.domain.Group.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Integer> {
    Optional<List<GroupEntity>> findAllByGroupcreater(String username);
}
