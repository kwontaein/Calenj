package org.example.calenj.calendar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShareScheduleRequest {
    private List<SharedPositionRequest> sharedPositionRequests;
    private boolean copyAble;
    private UUID scheduleId;
}
