package org.example.calenj.group.groupschedule.domain.ids;

import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.group.groupinfo.domain.GroupUserEntity;

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
