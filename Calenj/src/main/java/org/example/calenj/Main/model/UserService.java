package org.example.calenj.Main.model;


import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.UserDTO;
import org.example.calenj.Main.DTO.ValidateDTO;
import org.example.calenj.Main.JWT.JwtToken;
import org.example.calenj.Main.JWT.JwtTokenProvider;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.UserEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {


    GrobalService grobalService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ValidateDTO validateDTO;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;



    public int saveUser(UserDTO userDTO) {
        //패스워드 암호화
        userDTO.setUser_password(passwordEncoder.encode(userDTO.getUser_password()));
        System.out.println("UserRole 출력 : "+ userDTO.getUser_role());
        userRepository.save(userDTO.toEntity());
        return userDTO.toEntity().getUser_id();
    }

    public void selectUserInfo() {
        UserDetails userDetails = grobalService.extractFromSecurityContext();

        //select 테스트
        Optional<UserEntity> user = userRepository.findByAccountid(userDetails.getUsername());
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
}
