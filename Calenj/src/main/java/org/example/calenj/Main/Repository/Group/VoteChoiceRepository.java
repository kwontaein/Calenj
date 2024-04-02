package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.domain.Group.VoteChoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VoteChoiceRepository extends JpaRepository<VoteChoiceEntity, UUID> {

}
