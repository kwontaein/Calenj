package org.example.calenj.calendar.domain.Ids;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.user.domain.UserEntity;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserScheduleEntityId implements Serializable {
    private UUID scheduleId;
    private UserEntity userId;
}
