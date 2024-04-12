package org.example.calenj.Main.Repository;

import org.example.calenj.Main.domain.Ids.MessageEventId;
import org.example.calenj.Main.domain.MessageEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageEventRepository extends JpaRepository<MessageEventEntity, MessageEventId> {

}
