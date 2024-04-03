package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.DTO.Group.GroupVoteDTO;
import org.example.calenj.Main.domain.Group.GroupVoteEntity;
import org.example.calenj.Main.domain.Ids.GroupVoteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface Group_VoteRepository extends JpaRepository<GroupVoteEntity, GroupVoteId> {
    // 쿼리: GroupVote를 List로 조회
    @Query("SELECT new org.example.calenj.Main.DTO.Group.GroupVoteDTO(gv.voteId, gv.voteCreater, gv.voteTitle, gv.voteCreated, gv.voteEndDate) FROM Group_Vote gv WHERE gv.group.groupId = :groupId")
    Optional<List<GroupVoteDTO>> findVoteByGroupId(@Param("groupId") UUID groupId);

    Optional<GroupVoteEntity> findGroupVoteEntityByVoteId(UUID voteId);

    //voteId로 상세조회
    @Query("SELECT new org.example.calenj.Main.DTO.Group.GroupVoteDTO(gv.group.groupId,gv.voteId, gv.voteCreater, gv.voteTitle, gv.voteCreated, gv.voteEndDate,gv.isMultiple, gv.anonymous, gv.voteWatcher) FROM Group_Vote gv WHERE gv.voteId = :voteId")
    Optional<GroupVoteDTO> findByVoteId(@Param("voteId") UUID voteId);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE Group_Vote SET vote_watcher = :voteWatcher WHERE vote_id = :voteId", nativeQuery = true)
    void updateVoteWatcher(@Param("voteWatcher") String voteWatcher, @Param("voteId") UUID voteId);


}
