package org.example.calenj.Main.Repository;

import org.example.calenj.Main.DTO.FriendDTO;
import org.example.calenj.Main.domain.FriendEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FriendRepository extends JpaRepository<FriendEntity, UUID> {
    @Query("SELECT new org.example.calenj.Main.DTO.FriendDTO(f.friendId,f.ownUserId.userEmail,f.friendUserId,f.nickName,f.createDate" +
            ",f.status) FROM Friends f WHERE f.ownUserId.userEmail =:userId")
    Optional<List<FriendDTO>> findFriendListbyId(@Param("userId") String userId);

}
