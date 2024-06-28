package org.example.calenj.friend.repository;

import org.example.calenj.friend.domain.FriendEntity;
import org.example.calenj.friend.domain.ids.FriendId;
import org.example.calenj.friend.dto.response.FriendResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FriendRepository extends JpaRepository<FriendEntity, FriendId> {
    @Query("SELECT new org.example.calenj.friend.dto.response.FriendResponse" +
            "(f.friendUserId,f.nickName,f.ChattingRoomId,f.createDate) FROM Friends f WHERE f.ownUserId.userId =:userId and f.status =ACCEPT")
    Optional<List<FriendResponse>> findFriendListById(@Param("userId") UUID userId);

    @Query("SELECT new org.example.calenj.friend.dto.response.FriendResponse(f.friendUserId,f.nickName,f.ChattingRoomId) FROM Friends f WHERE f.ownUserId.userId =:userId and f.status =WAITING")
    Optional<FriendResponse> findFriendById(@Param("userId") UUID userId);

    @Query("SELECT f.status FROM Friends f WHERE f.ownUserId.userId =:myUserId and f.friendUserId =:userId and f.status =ACCEPT")
    Optional<String> findFriendByIdIsAccept(@Param("userId") UUID userId, @Param("myUserId") UUID myUserId);
    @Modifying
    @Transactional
    @Query("delete from Friends f where f.ownUserId.userId =:userId")
    void deleteByOwnUserId(@Param("userId") UUID userId);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE Friends SET status =:statusType WHERE own_user_id = :requestUserId", nativeQuery = true)
    void updateStatus(@Param("requestUserId") UUID requestUserId, @Param("statusType") FriendEntity.statusType statusType);

    @Query("SELECT f.ChattingRoomId FROM Friends f WHERE f.friendUserId =:userId")
    Optional<String> findFriendChatRoomId(@Param("userId") UUID userId);

    @Query("select f.friendUserId from Friends f join Friends f2 on f.friendUserId=f2.friendUserId where f.ownUserId.userId=:myUserId and f2.ownUserId.userId=:otherUserId")
    Optional<List<String>> DuplicateFriendList(@Param("myUserId") UUID myUserId, @Param("otherUserId") UUID otherUserId);
}
