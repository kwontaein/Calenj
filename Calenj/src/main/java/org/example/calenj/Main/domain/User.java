package org.example.calenj.Main.domain;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자를 생성하며, 영속성을 지키기 위해 Protected 설정
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @Builder를 사용
@Builder // 빌더
@Getter
public class User implements UserDetails {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private int user_id;

    private String account_id;
    private String user_password;
    private String user_join_date;
    private String user_email;
    private String user_phone;

    @Builder.Default // 기본값 지정
    private String user_role = "User";
    @Builder.Default // 기본값 지정
    private boolean naver_login = false;
    @Builder.Default
    private boolean kakao_login = false;
    @Builder.Default
    private boolean withdrawed = true;

    @Override
    public String toString() {
        return "User{" +
                "user_id=" + user_id +
                ", account_id='" + account_id + '\'' +
                ", user_password='" + user_password + '\'' +
                ", user_join_date='" + user_join_date + '\'' +
                ", user_email='" + user_email + '\'' +
                ", user_phone='" + user_phone + '\'' +
                ", user_roll='" + user_role + '\'' +
                ", naver_login=" + naver_login +
                ", kakao_login=" + kakao_login +
                ", withdrawed=" + withdrawed +
                '}';
    }

    //--여기서부터 UserDetails 요소들 오버라이드

    /**
     * 해당 유저의 권한 목록
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null; // 추후 찾아볼 예정
    }

    /**
     * 비밀번호
     */
    @Override
    public String getPassword() {
        return user_password;
    }


    /**
     * PK값
     */
    @Override
    public String getUsername() {
        return account_id;
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
