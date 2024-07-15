package org.example.calenj.file.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity(name = "File")
@NoArgsConstructor
@AllArgsConstructor
@Builder // 빌더
@Getter
@ToString
public class FileEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(nullable = false, unique = true, name = "file_id", columnDefinition = "BINARY(16)")
    private UUID fileId;

    @Lob
    @Column(name = "file_data", nullable = false)
    private byte[] fileData;

    @Column(nullable = false, unique = true, name = "used_id", columnDefinition = "BINARY(16)")
    private UUID useId;
}

