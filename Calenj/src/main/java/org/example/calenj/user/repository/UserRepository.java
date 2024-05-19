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

    Optional<UserEntity> findByRefreshToken(String refreshToken); //optional -> nullPointerException 방지

    //refreshToken 저장 쿼리
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE User SET refreshToken = :refreshToken WHERE user_email = :email", nativeQuery = true)
    void updateUserRefreshToken(@Param("refreshToken") String refreshToken, @Param("email") String email);

    //refreshToken 삭제 쿼리
    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE User SET refreshToken = NULL WHERE user_id = :userId", nativeQuery = true)
    void updateUserRefreshTokenToNull(@Param("userId") String userId);


    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE User u SET isOnline =:isOnline WHERE user_email = :email", nativeQuery = true)
    void updateIsOnline(@Param("email") String email, @Param("isOnline") String isOnline);

    @Modifying(clearAutomatically = true)
    @Transactional //update 는 해당 어노테이션이 필요함
    @Query(value = "UPDATE User SET nickname =:nickname WHERE user_email = :email", nativeQuery = true)
    void updateUserNickName(@Param("nickname") String nickname, @Param("email") String email);
}
