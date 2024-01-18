package org.example.calenj.Main.model;

import lombok.RequiredArgsConstructor;
import org.example.calenj.Main.DTO.UserDTO;
import org.example.calenj.Main.JWT.JwtToken;
import org.example.calenj.Main.JWT.JwtTokenProvider;
import org.example.calenj.Main.Repository.Test2Repository;
import org.example.calenj.Main.Repository.UserRepository;
import org.example.calenj.Main.domain.Test2;
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
    Test2Repository test2Repository;
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

    public void saveTest2(Test2 test2Info) {
        //승재 삽입 코드
        Test2 test2 = Test2.builder()
                .account_id(test2Info.getAccount_id()) //getter로 받은 데이터 사용
                .user_password(test2Info.getUser_password())
                .build();
        test2Repository.save(test2);
        //------------위 코드와 아래의 코드는 같은 기능-------------------
        /*test2Repository.save(Test2.builder()
                .account_id(test2Info.getAccount_id())
                .user_password(test2Info.getUser_password())
                .build());*/

    }

    public void updateTest(Test2 test2Info) {
        //업데이트 테스트
        Test2 test2 = Test2.builder()
                .userid(test2Info.getUserid())
                .account_id(test2Info.getAccount_id())
                .user_password(test2Info.getUser_password())
                .build();
        test2Repository.save(test2);
        //------------위 코드와 아래의 코드는 같은 기능-------------------
        /*test2Repository.save(Test2.builder()
                .userid(test2Info.getUserid())
                .account_id(test2Info.getAccount_id())
                .user_password(test2Info.getUser_password())
                .build());*/
    }

    public void deleteTest(Test2 test2Info) {
        Test2 test2 = Test2.builder().userid(test2Info.getUserid()).build();
        //delete는 null체크와 새로 생성한 entity인지 확인 후 삭제 -> 바로 삭제
        test2Repository.delete(test2);
        //deletebyid 는 아이디 값으로 삭제 -> select 후 delete 실행 -> deleteById를 사용하면 entity를 조회할 필요 없음
        test2Repository.deleteById(test2Info.getUserid());
        //------------위 코드와 아래의 코드는 같은 기능-------------------
        //test2Repository.delete(Test2.builder().userid(1).account_id("moon11").build());
    }

    public void selectUser(UserEntity userInfo) {
        //select 테스트
        Optional<UserEntity> user = userRepository.findById(userInfo.getUser_id());
        String userResult = (user.isPresent() ? user.toString() : "정보가 없습니다");

        System.out.println(userResult);

    }

    public void selectTest2(Test2 test2Info) {
        //select 테스트
        Optional<Test2> test = test2Repository.findById(test2Info.getUserid()); //Optional을 사용하여 nullPointerException을 방지해줌을 알 수 있습니다.
        String testResult = (test.isPresent() ? test.toString() : "정보가 없습니다");
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
            saveRefreshToken(user.getAccountid(), tokenInfo.getRefreshToken());

            System.out.println("tokenInfo : " + tokenInfo);
            return tokenInfo;

        } else {
            //저장된 값이 있는 경우는 필터에서 이미 토큰을 새로 생성하거나 이미 쿠키에 저장된 상태. 고로 아무것도 할 필요 없다
            //사실 else문도 필요 없지만 출력문 써놓음
            /*JwtToken tokenInfo = jwtTokenProvider.refreshAccessToken(refreshToken);
            System.out.println("tokenInfo : " + tokenInfo);*/
            System.out.println("저장된 값 있음. 토큰 생성 안함");
            return null;
        }

    }

    //토큰 정보 DB 저장 메소드
    public void saveRefreshToken(String accountid, String refreshToken) {
        System.out.println(accountid + " " + refreshToken);
        userRepository.updateUserRefreshToken(refreshToken, accountid);
    }
}
