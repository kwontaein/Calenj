package org.example.calenj.Main.model;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.UserDTO;
import org.example.calenj.Main.JWT.JwtToken;
import org.example.calenj.Main.JWT.JwtTokenProvider;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MainService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    public void saveUser(UserEntity userInfo) {
        //유저 삽입 코드
        UserEntity user = UserEntity.builder()
                .accountid(userInfo.getAccountid()) //getter로 받은 데이터 사용
                .user_password(passwordEncoder.encode(userInfo.getUser_password())) //비밀번호 암호화
                .user_email(userInfo.getUser_email())
                .user_phone(userInfo.getUser_phone())
                .user_role(userInfo.getUser_role())
                .kakao_login(userInfo.isKakao_login())
                .naver_login(userInfo.isNaver_login())
                .user_join_date(userInfo.getUser_join_date())
                .withdrawed(userInfo.isWithdrawed())
                .build();

        userRepository.save(user);

        //------------위 코드와 아래의 코드는 같은 기능-------------------
        /*userRepository.save(User.builder()
                .account_id(userInfo.getAccount_id())
                .user_password(userInfo.getUser_password())
                .user_email(userInfo.getUser_email())
                .user_phone(userInfo.getUser_phone())
                .user_roll(userInfo.getUser_roll())
                .kakao_login(userInfo.isKakao_login())
                .naver_login(userInfo.isNaver_login())
                .user_join_date(userInfo.getUser_join_date())
                .withdrawed(userInfo.isWithdrawed())
                .build());*/
    }

    public int saveUser2(UserDTO userDTO) {
        //패스워드 암호화
        userDTO.setUser_password(passwordEncoder.encode(userDTO.getUser_password()));
        userRepository.save(userDTO.toEntity());
        return userDTO.toEntity().getUser_id();
    }


    public void selectUser(UserEntity userInfo) {
        //select 테스트
        Optional<UserEntity> user = userRepository.findById(userInfo.getUser_id());
        String userResult = (user.isPresent() ? user.toString() : "정보가 없습니다");

        System.out.println(userResult);
    }

    @Transactional
    public JwtToken login(String accountid, String password) {
        //여기서 패스워드를 암호화 하는것도 옳지 않음.
        //로그인 프로세스 중에 패스워드를 다시 인코딩하면 안됨.
        //이미 Authentication 프로세스 내부에서 패스워드 비교를 실행하기 때문.

        System.out.println("실행 login");

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(accountid, password);

        System.out.println("UsernamePasswordAuthenticationToken 실행 ");
        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // Spring Security는 실제로 패스워드 값을 Authentication 객체에 저장하지 않습니다.
        // 따라서 authentication.getCredentials() 메서드를 호출하면 항상 null이 반환됩니다.
        // 패스워드를 검증하기 위한 작업은 UserDetailsService의 loadUserByUsername 메서드에서 이루어집니다.

        //검증이 되었다면 -> refreshToken 저장 유무를 불러와서, 있다면 토큰 재발급, 없다면 아예 발급, 만료 기간 여부에 따라서도 기능을 구분
        UserEntity userEntity = userRepository.findByAccountid(accountid)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        String refreshToken = userEntity.getRefreshToken();

        if (refreshToken == null) { // DB에 저장된 값이 없는 경우
            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            JwtToken tokenInfo = jwtTokenProvider.generateToken(authentication);

            // 4. refreshToken 정보 저장을 위한 account_id 값 가져오기
            UserEntity user = (UserEntity) authentication.getPrincipal();
            // refreshToken 정보 저장
            userRepository.updateUserRefreshToken(tokenInfo.getRefreshToken(), user.getAccountid());
            System.out.println("tokenInfo : " + tokenInfo);
            return tokenInfo;
        } else {
            //저장된 값이 있는 경우는 필터에서 이미 토큰을 새로 생성하거나 이미 쿠키에 저장된 상태. -> 임의로 쿠키를 지운 상태라면 ?
            //저장된 refreshToken 값의 만료 기간을 검사하고, 유효하면 accessToken 값을 새로 생성해줘야 함
            //유효하지 않다면 두개 다 새로 생성해줘야 한다.

            JwtToken tokenInfo = jwtTokenProvider.refreshAccessToken(refreshToken);
            System.out.println("tokenInfo : " + tokenInfo);
            return null;
        }

    }

    //쿠키에서 토큰 정보 빼기
    public String extractTokenFromCookieHeader(String cookieHeader, String targetCookieName) {
        if (cookieHeader != null) {
            // 쿠키 헤더를 각각의 쿠키로 분할합니다.
            String[] cookies = cookieHeader.split("; ");

            // 각 쿠키를 반복하면서 처리합니다.
            for (String cookie : cookies) {
                // 각 쿠키를 이름-값 쌍으로 분할합니다.
                String[] parts = cookie.split("=");

                // 현재 쿠키가 이름과 값 모두를 갖고 있는지 확인합니다.
                if (parts.length == 2) {
                    String name = parts[0];
                    String value = parts[1];

                    // 현재 쿠키가 대상 쿠키의 이름과 일치하는지 확인합니다.
                    if (name.equals(targetCookieName)) {
                        return value; // 대상 쿠키의 값 반환
                    }
                }
            }
        }
        return null; // 헤더에서 대상 쿠키를 찾지 못한 경우 null 반환
    }


    public void removeCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("accessToken", null);
        Cookie cookie2 = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie2.setMaxAge(0);
        cookie2.setPath("/");
        response.addCookie(cookie);
        response.addCookie(cookie2);
    }


}
