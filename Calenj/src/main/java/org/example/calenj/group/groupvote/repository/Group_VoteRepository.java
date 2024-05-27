package org.example.calenj.group.groupvote.repository;

import org.example.calenj.group.groupvote.domain.ids.GroupVoteId;
import org.example.calenj.group.groupvote.dto.response.GroupVoteResponse;
import org.example.calenj.group.groupvote.domain.GroupVoteEntity;
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
    @Query("SELECT new org.example.calenj.group.groupvote.dto.response.GroupVoteResponse(gv.voteId, gv.voteCreator, gv.voteTitle, gv.voteCreated, gv.voteEndDate, gv.countVoter) FROM Group_Vote gv WHERE gv.group.groupId = :groupId")
    Optional<List<GroupVoteResponse>> findVoteByGroupId(@Param("groupId") UUID groupId);


    //voteId찾기
    Optional<GroupVoteEntity> findGroupVoteEntityByVoteId(UUID voteId);

    //voteId로 상세조회
    @Query("SELECT new org.example.calenj.group.groupvote.dto.response.GroupVoteResponse(gv.voteCreator, gv.voteTitle, gv.voteCreated, gv.voteEndDate,gv.isMultiple, gv.anonymous, gv.voteWatcher,gv.countVoter) FROM Group_Vote gv WHERE gv.voteId = :voteId")
    Optional<GroupVoteResponse> findByVoteId(@Param("voteId") UUID voteId);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE Group_Vote SET vote_watcher = :voteWatcher WHERE vote_id = :voteId", nativeQuery = true)
    void updateVoteWatcher(@Param("voteWatcher") String voteWatcher, @Param("voteId") UUID voteId);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE Group_Vote SET count_voter = :countVoter WHERE vote_id = :voteId", nativeQuery = true)
    void updateVoteCount(@Param("voteId") UUID voteId, @Param("countVoter") String countVoter);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE Group_Vote SET vote_end_date = :voteEndDate WHERE vote_id = :voteId", nativeQuery = true)
    void updatevoteEndDate(@Param("voteId") UUID voteId, @Param("voteEndDate") String voteEndDate);
}
