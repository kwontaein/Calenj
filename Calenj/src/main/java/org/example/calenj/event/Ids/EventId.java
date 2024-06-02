package org.example.calenj.event.Ids;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
