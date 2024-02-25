package org.example.calenj.Main.domain.Group.Ids;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Embeddable
public class GroupUserId implements Serializable {
    private UUID group;
    private String user;
}
