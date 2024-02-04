package org.example.calenj.Main.Repository;

import org.example.calenj.Main.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByAccountid(String username);

    Optional<UserEntity> findByRefreshToken(String refreshToken); //optional -> nullpointerException 방지

    //refreshToken 저장 쿼리
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE User SET refreshToken = :refreshToken WHERE account_id = :accountid", nativeQuery = true)
    void updateUserRefreshToken(String refreshToken, String accountid);

}
