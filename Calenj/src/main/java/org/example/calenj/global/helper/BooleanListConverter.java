package org.example.calenj.global.helper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class BooleanListConverter implements AttributeConverter<List<Boolean>, String> {

    // JSON 데이터를 Java 객체로 변환하거나 Java 객체를 JSON 데이터로 변환하기 위해 사용
    private static final ObjectMapper mapper = new ObjectMapper()

            // 알려지지 않은 속성이 있는 경우 역직렬화 중에 예외를 발생시키지 않도록 설정, false 시 알 수 없는 속성 무시
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            // 원시 타입 필드에 null 값이 포함된 경우 예외를 발생시키지 않도록 설정, false 시 null값이 원시 타입 필드에 할당 가능
            .configure(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES, false);

    // List를 String 타입으로 변환
    @Override
    public String convertToDatabaseColumn(List<Boolean> attribute) {
        try {
            return mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting List<Boolean> to String", e);
        }
    }

    @Override
    public List<Boolean> convertToEntityAttribute(String dbData) {
        // dbData가 null이거나 비어있는 경우 빈 리스트를 반환합니다.
        if (dbData == null || dbData.trim().isEmpty()) {
            return Collections.emptyList(); // 또는 return null;
        }

        TypeReference<List<Boolean>> typeReference = new TypeReference<>() {
        };
        try {
            return mapper.readValue(dbData, typeReference);
        } catch (IOException e) {
            throw new IllegalArgumentException("Error converting String to List<Boolean>", e);
        }
    }
}