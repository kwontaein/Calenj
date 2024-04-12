package org.example.calenj.Main.domain.Ids;
import lombok.*;
import java.io.Serializable;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageEventId implements Serializable {
    private UUID messageEventId;
    private String userId;
}
