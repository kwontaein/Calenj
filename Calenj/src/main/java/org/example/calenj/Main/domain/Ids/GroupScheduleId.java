package org.example.calenj.Main.domain.Ids;

import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.example.calenj.Main.domain.Group.GroupUserEntity;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@Getter
//@EqualsAndHashCode
//@Embeddable
public class GroupScheduleId implements Serializable {
    private UUID groupScheduleId;
    @ManyToOne
    private GroupUserEntity groupUser;
}
