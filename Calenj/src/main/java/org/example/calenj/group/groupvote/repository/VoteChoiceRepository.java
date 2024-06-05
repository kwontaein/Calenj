package org.example.calenj.group.groupvote.repository;

import org.example.calenj.group.groupvote.dto.response.VoteChoiceResponse;
import org.example.calenj.group.groupvote.domain.VoteChoiceEntity;
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
public interface VoteChoiceRepository extends JpaRepository<VoteChoiceEntity, UUID> {
    @Query("SELECT new org.example.calenj.group.groupvote.dto.response.VoteChoiceResponse(vc.choiceId,vc.voteItem,vc.voter,vc.voteIndex) FROM VoteChoice vc WHERE vc.vote.voteId = :voteId")
    Optional<List<VoteChoiceResponse>> findVoteItemByVoteId(@Param("voteId") UUID voteId);


    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE VoteChoice SET voter = :voter WHERE choice_id = :choiceId", nativeQuery = true)
    void updateVoterList(@Param("choiceId") UUID choiceId, @Param("voter") String voter);


}
