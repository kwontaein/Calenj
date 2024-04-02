package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.domain.Group.ChoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ChoiceRepository extends JpaRepository<ChoiceEntity, UUID> {
}
