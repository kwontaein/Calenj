package org.example.calenj.Main.Repository.Group;

import org.example.calenj.Main.DTO.Group.GroupVoteDTO;
import org.example.calenj.Main.DTO.Group.VoteChoiceDTO;
import org.example.calenj.Main.domain.Group.VoteChoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VoteChoiceRepository extends JpaRepository<VoteChoiceEntity, UUID> {
    @Query("SELECT new org.example.calenj.Main.DTO.Group.VoteChoiceDTO(vc.voteItem,vc.voter) FROM VoteChoice vc WHERE vc.vote.voteId = :voteId")
    Optional<List<VoteChoiceDTO>> findVoteItemByVoteId(@Param("voteId") UUID voteId);
}
