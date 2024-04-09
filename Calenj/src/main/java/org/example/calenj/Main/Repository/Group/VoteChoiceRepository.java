package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.DTO.Group.GroupVoteDTO;
import org.example.calenj.Main.DTO.Group.VoteChoiceDTO;
import org.example.calenj.Main.domain.Group.VoteChoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VoteChoiceRepository extends JpaRepository<VoteChoiceEntity, UUID> {
    @Query("SELECT new org.example.calenj.Main.DTO.Group.VoteChoiceDTO(vc.choiceId,vc.voteItem,vc.voter,vc.voteIndex) FROM VoteChoice vc WHERE vc.vote.voteId = :voteId")
    Optional<List<VoteChoiceDTO>> findVoteItemByVoteId(@Param("voteId") UUID voteId);


    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE VoteChoice SET voter = :voter WHERE choice_id = :choiceId", nativeQuery = true)
    void updateVoterList(@Param("choiceId") UUID choiceId,@Param("voter") String voter);


}
