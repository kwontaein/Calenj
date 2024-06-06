package org.example.calenj.calendar.repository;

import org.example.calenj.calendar.domain.StampEntity;
import org.example.calenj.calendar.dto.response.StampResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StampRepository extends JpaRepository<StampEntity, UUID> {
    @Query("SELECT new org.example.calenj.calendar.dto.response.StampResponse(st.stampId,st.title,st.content) FROM stamp st WHERE st.userId.userId = :userId")
    Optional<List<StampResponse>> findByUserID(@Param("userId") UUID userId);
}
