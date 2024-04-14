package org.example.calenj.Main.domain.Ids;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode
//@Getter
//@Setter
public class EventId implements Serializable {
    private UUID eventId;
    private String ownUserId;
}
