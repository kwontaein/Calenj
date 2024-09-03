package org.example.calenj.calendar.repository;

import org.example.calenj.calendar.domain.Ids.TagId;
import org.example.calenj.calendar.domain.TagEntity;
import org.example.calenj.calendar.dto.response.TagResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, TagId> {
    @Query("SELECT new org.example.calenj.calendar.dto.response.TagResponse(ST.tagId,ST.tag,ST.tagColor,ST.defaultTag) FROM Schedule_Tag ST WHERE ST.userId.userId =:userId and ST.groupTag = false order by ST.addTime asc ")
    Optional<List<TagResponse>> findByUserId(@Param("userId") UUID userId);

    @Query("SELECT new org.example.calenj.calendar.dto.response.TagResponse(ST.tagId,ST.tag,ST.tagColor,ST.defaultTag) FROM Schedule_Tag ST WHERE ST.groupId =:groupId")
    Optional<TagResponse> findTagByGroupId(@Param("groupId") UUID groupId);
}
