package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.DTO.Group.GroupVoteDTO;
import org.example.calenj.Main.domain.Group.GroupVoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface Group_VoteRepository extends JpaRepository<GroupVoteEntity, UUID> {
    // 쿼리: GroupVoteEntity 조회
    @Query("SELECT new org.example.calenj.Main.DTO.Group.GroupVoteDTO(gv.voteId, gv.voteCreater, gv.voteTitle,gv.voteItem, gv.voteCreated, gv.voteEndDate,gv.isMultiple, gv.anonymous) FROM Group_Vote gv WHERE gv.group.groupId = :groupId")
    List<GroupVoteDTO> findGroupVote(@Param("groupId") UUID groupId);

}
