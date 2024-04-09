package org.example.calenj.Main.Repository;

import org.example.calenj.Main.DTO.User.FriendDTO;
import org.example.calenj.Main.domain.FriendEntity;
import org.example.calenj.Main.domain.Ids.FriendId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<FriendEntity, FriendId> {
    @Query("SELECT new org.example.calenj.Main.DTO.FriendDTO.Response(f.friendUserId,f.nickName,f.ChattingRoomId,f.createDate) FROM Friends f WHERE f.ownUserId.userEmail =:userId and f.status =ACCEPT")
    Optional<List<FriendDTO.Response>> findFriendListById(@Param("userId") String userId);

    @Query("SELECT new org.example.calenj.Main.DTO.FriendDTO.Response(f.friendUserId,f.nickName,f.ChattingRoomId) FROM Friends f WHERE f.ownUserId.userEmail =:userId and f.status =ACCEPT")
    Optional<FriendDTO.Response> findFriendById(@Param("userId") String userId);

    @Query("delete from Friends f where f.ownUserId =:userId")
    void deleteByOwnUserId(@Param("userId") String userId);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE Friends SET status =:statusType WHERE ownUserId = :requestUserId", nativeQuery = true)
    void updateStatus(@Param("requestUserId") String requestUserId, @Param("statusType") FriendEntity.statusType statusType);
}
