package org.example.calenj.Main.domain.Group.Ids;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@Embeddable
public class GroupUserId implements Serializable {
    private int group;
    private int user;
}
