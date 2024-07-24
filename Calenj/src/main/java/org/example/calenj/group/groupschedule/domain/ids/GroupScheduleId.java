package org.example.calenj.group.groupschedule.domain.ids;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupScheduleId implements Serializable {
    private UUID groupScheduleId;
}
