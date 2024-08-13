package org.example.calenj.user.repository;

import org.example.calenj.user.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByUserEmail(@Param("user_email") String username);

    Optional<UserEntity> findByUserId(@Param("user_id") UUID userId);

    Optional<UserEntity> findByUserUsedName(@Param("user_used_name") String userName);
    
    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE User SET nickname =:nickname WHERE user_email = :email", nativeQuery = true)
    void updateUserNickName(@Param("nickname") String nickname, @Param("email") String email);
}
