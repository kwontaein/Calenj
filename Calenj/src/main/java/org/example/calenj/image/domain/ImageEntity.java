package org.example.calenj.image.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "images")
@NoArgsConstructor
@AllArgsConstructor
@Builder // 빌더
@Getter
@ToString
public class ImageEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "image_id", columnDefinition = "BINARY(16)")
    private UUID imageId;

    @Lob
    @Column(name = "image_data", nullable = false)
    private byte[] imageData;

    @Column(nullable = false, unique = true, name = "used_id", columnDefinition = "BINARY(16)")
    private UUID useId;
}

