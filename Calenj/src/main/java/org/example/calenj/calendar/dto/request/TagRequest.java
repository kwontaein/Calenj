package org.example.calenj.calendar.dto.request;

import lombok.Data;
import org.example.calenj.calendar.domain.TagEntity;
import org.example.calenj.user.domain.UserEntity;

import java.util.UUID;

@Data
public class TagRequest {
    private UUID id;
    private String name;
    private String color;

    public TagEntity toEntity(UserEntity userEntity) {
        return TagEntity
                .builder()
                .userId(userEntity)
                .tag(name)
                .tagColor(color)
                .build();
    }
}
