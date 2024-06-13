package org.example.calenj.calendar.repository;

import org.example.calenj.calendar.domain.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, UUID> {
    @Query("SELECT ST.tag FROM Schedule_Tag ST WHERE ST.userId.userId =:userId")
    Optional<List<TagEntity>> findByUserId(@Param("userId") UUID userId);
}
