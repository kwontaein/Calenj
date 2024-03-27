package org.example.calenj.Main.domain;


import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import lombok.*;
import org.example.calenj.Main.domain.Group.GroupUserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

@Entity(name = "User")
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
@ToString
public class UserEntity implements UserDetails {

    //primary key
    @Id
    @Column(nullable = false, unique = true, name = "user_email")
    private String userEmail;

    private String nickname;

    @Column(name = "user_password")
    private String userPassword;

    @Column(name = "user_join_date")
    private String userJoinDate;

    @Column(name = "user_phone")
    private String userPhone;


    @Enumerated(EnumType.STRING)
    private RoleType userRole;


    @Builder.Default // 기본값 지정
    private boolean naver_login = false;
    @Builder.Default
    private boolean kakao_login = false;
    @Builder.Default
    private boolean withdrawed = true;

    private String refreshToken;

    @OneToMany(mappedBy = "user")
    private List<GroupUserEntity> memberships;
    //--여기서부터 UserDetails 요소들 오버라이드


    @Getter
    @RequiredArgsConstructor
    public enum RoleType { //enum을 활용한 권한종류 설정
        USER("사용자"),
        ADMIN("관리자"),
        MANAGER("매니저");

        private final String role;

        //user_role 유효성 검사
        @JsonCreator
        public static RoleType userRoleParsing(String inputValue) {

            return Stream.of(RoleType.values())
                    .filter(roleType -> roleType.toString().equals(inputValue))
                    .findFirst()
                    .orElse(null);
        }

    }

    /**
     * 해당 유저의 권한 목록
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("ROLE_" + userRole.getRole()));

        return authorities;
    }

    /**
     * 비밀번호
     */
    @Override
    public String getPassword() {
        return userPassword;
    }


    /**
     * PK값
     */
    @Override
    public String getUsername() {
        return userEmail;
    }

    /**
     * 계정 만료 여부
     * true : 만료 안됨
     * false : 만료
     *
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 계정 잠김 여부
     * true : 잠기지 않음
     * false : 잠김
     *
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 비밀번호 만료 여부
     * true : 만료 안됨
     * false : 만료
     *
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    /**
     * 사용자 활성화 여부
     * ture : 활성화
     * false : 비활성화
     *
     * @return
     */
    @Override
    public boolean isEnabled() {
        //이메일이 인증되어 있고 계정이 잠겨있지 않으면 true
        return withdrawed;

    }
}
