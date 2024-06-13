package org.example.calenj.calendar.domain.Ids;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.calendar.domain.UserScheduleEntity;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepeatStateId implements Serializable {
    private UserScheduleEntity scheduleId;
}
