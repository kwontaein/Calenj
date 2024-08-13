package org.example.calenj.user.repository;

import org.example.calenj.user.domain.UserChatEntity;
import org.example.calenj.user.dto.response.UserChatResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserChatRepository extends JpaRepository<UserChatEntity, UUID> {
    @Query("select new org.example.calenj.user.dto.response.UserChatResponse(uc.chatListId,uc.ownUserId,uc.friendId,uc.chatId,uc.isOpen) from UserChat uc where uc.ownUserId =:userId")
    Optional<List<UserChatResponse>> findChatList(@Param("userId") UUID userId);

}
