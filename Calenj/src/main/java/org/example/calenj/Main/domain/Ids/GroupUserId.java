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
//@Embeddable
public class GroupUserId implements Serializable {
    private UUID group;
    private String user;
}
