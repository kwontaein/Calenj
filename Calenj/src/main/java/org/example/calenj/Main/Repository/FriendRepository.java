package org.example.calenj.Main.Repository;

import org.example.calenj.Main.DTO.FriendDTO;
import org.example.calenj.Main.domain.FriendEntity;
import org.example.calenj.Main.domain.Ids.FriendId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<FriendEntity, FriendId> {
    @Query("SELECT new org.example.calenj.Main.DTO.FriendDTO(f.friendId,f.ownUserId.userEmail,f.friendUserId,f.nickName,f.createDate" +
            ",f.status) FROM Friends f WHERE f.ownUserId.userEmail =:userId")
    Optional<List<FriendDTO>> findFriendListById(String userId);

    @Query("delete from Friends f where f.ownUserId =:userId")
    void deleteByOwnUserId(String userId);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE Friends SET status =:statusType WHERE ownUserId = :requestUserId", nativeQuery = true)
    void updateStatus(String requestUserId, FriendEntity.statusType statusType);
}
