J가 되고 싶은 사람들을 위한, 이미 J인 사람들을 위한 일정 관리 어플 calenJ 입니다.

CalenJ는 개인 뿐 아니라 단체로 일정을 공유 가능한 일정 관리 프로그램입니다.

약속 뿐 아니라 미팅 및 여러 일정을 관리하고, 같은 그룹 및 친구에게 공유가 가능합니다.

사용자가 (일정을) 관리함에 있어서 긍정적인 경험을 할 수 있게 도와주는 프로그램입니다.

제작 기간 :  1월 4일 ~ 9월 3일 (8개월)
제작 인원 : 2인 (BackEnd 1 , FrontEnd 1)


기능 소개
- 기본적으로 개인의 일정 관리가 가능합니다.
- 친구와 함께하는 일정의 경우, 함께하는 친구에게 일정이 공유됩니다.
- 그룹의 경우, 여러 일정을 한번에 저장하고, 일정이 진행되는 장소를 지도로 확인 가능합니다.
- 그룹 일정에 참여한 그룹 멤버의 경우, 그룹 일정이 자동으로 캘린더에 추가되며, 별도의 수정은 따로 불가능합니다. 그룹 일정 관리자가 일정 수정 시에 함께 수정됩니다.
- 그룹은 기본적으로 채팅 및 공지, 투표의 기능이 제공되며, 이미지 전송 기능 또한 제공됩니다.
- 투표나 공지는 생성 시 채팅에서 쉽게 확인 가능합니다.

내 역할
- 전반적인 백엔드(서버)의 모든 부분을 담당.
- 각 페이지의 css 및 디자인을 제작.
- 채팅의 스크롤 기능 및 NAVER API 지도를 통한 위치 정보 표시 등을 제작.
    - direction5 를 통한 걸리는 시간 값 반환
- JPA를 이용한 데이터 관리 및 저장
    - converter(Object to Json) 을 사용한 값 저장
    - nativeQuery 를 사용한 직접적인 sql 문 사용

로그인 및 보안관리
- JWT (JSON WEB TOKEN) 을 이용한 인증 절차 구현
    - redis를 이용한 refreshToken 값 저장
- 스프링 시큐리티
    - `passwordEncoder` 를 사용한 비밀번호 암호화
    - `filterChain`을 사용한 인증 절차 구현
- 이메일 인증 서비스 구현 (spring.mail 사용)


웹소켓 연결 및 채팅 저장
- WebSocket + SockJs  + stomp 를 이용한 실시간 채팅
    - topic 분할 통한 친구와 그룹 채팅 및 개인 알림 구분
    - 받은 메세지의 상태(status)를 통한 처리 (알람 / 채팅 / 읽음 처리)
- 파일 저장을 통한 채팅 내역 관리
    - stream 을 통한 파일 읽기 및 내용 형식 처리
- 사용자 실시간 온라인 상태 반환
    - WebSocket의 구독한 topic 정보로 온라인 상태 반환

 그룹 관리
 - 그룹 일정
    - 그룹 생성 및 그룹 세부 정보 반환
    - 그룹 초대 코드를 통한 타 유저 초대
- 그룹 공지 및 투표
    - 그룹 공지와 투표 생성 및 조회, 참여
- 그룹 일정
    - 그룹 일정 생성 및 관리
    - 그룹 일정 참여 관리
        - 참여한 그룹 일정 개인 일정에 추가
        - 그룹 일정 업데이트 시 개인 일정 또한 업데이트
    - 지도를 통한 약속 위치 확인
 

개인 일정 관리
- 개인 일정 관리
    - fullCalendar api 를 사용한 일정 관리
- 일정 공유
    - 개인 및 그룹에게 내 일정 공유
- 태그를 통한 일정 분류
    - 원하는 색상 및 이름으로 태그 저장
 
친구 관리
- 친구 요청
    - 개인이 설정 가능한 아이디를 통한 친구 요청
- 온라인 친구 목록
    - websocket에서 처리한 온라인 목록을 통한 온라인 친구 목록 설정
- 친구 차단
    - 친구 차단 목록을 통한 관리
    - 차단된 친구에게는 사용자의 아이디가 검색되지 않게 설정
 
트러블 슈팅
JPA 검색 관련

JWT 관련

1. 토큰의 동작 방식 수정
2. 토큰 검증 상태 반환
3. dofilter
4. redis 사용 이유 (+ 이메일)

온라인 상태 저장 관련

1. 방식의 수정
2. 상태 저장 방식

List<> 혹은 배열 저장 관련

1. @ElementCollection 에서 ListToStringConverter로 변경

그룹 일정을 개인 일정에 저장하는 부분.

1. 그룹 일정과 같은 내용의 일정을 참여한 모든 유저에게 생성
2. 통일된 하나의 일정으로 수정

친구 추가 관련.

1. 친구 요청 및 관계 처리를 위한 DB 처리
2. 친구 관계 관리

파일 구조 관련.

1. domain 위주로 리팩토링

웹소켓 채팅 처리

1. 메세지 형식 처리
2. 알림 갯수 처리 및 읽음 처리
3. 메세지 state에 따른 알림 / 채팅 구분 처리

일정 생성 시 형식 맞추기

1. 각 일정에 대한 형식 맞추기
