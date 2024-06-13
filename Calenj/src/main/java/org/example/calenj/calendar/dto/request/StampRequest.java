package org.example.calenj.calendar.dto.request;

import lombok.Data;
import org.example.calenj.calendar.domain.StampEntity;
import org.example.calenj.user.domain.UserEntity;

import java.util.UUID;

@Data
public class StampRequest {
    private UUID userId;
    private String content;
    private String title;

    public StampEntity toEntity(UserEntity userEntity) {
        return StampEntity
                .builder()
                .userId(userEntity)
                .content(content)
                .title(title).build();
    }
}
