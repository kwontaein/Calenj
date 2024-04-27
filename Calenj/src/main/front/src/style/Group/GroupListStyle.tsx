import styled, { keyframes } from 'styled-components';

/** 받은 메시지가 있는지 확인하기 위한 Props*/
interface receivedMsg {
 $existMessage:boolean
}
interface navigatePram {
  $isClick : boolean
}


export const GroupList_Container_width :number =72

/** 흔드는 애니메이션 */
const shakeAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(5deg);
  }
  66% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;


/**
 * 그룹 리스트 컨테이너
 */
 export const GroupList_Container = styled.div`
 height:100%;
 text-align: center;
 width: ${GroupList_Container_width}px;
 align-items: center;
`

/**
 * 그룹 리스트 컨테이너 안에 있는 서브 컨테이너
 */
export const GroupListSub_Container = styled.div`
 width:auto;
 display: flex;
 flex-direction: column;
 align-items: center;
 overflow-y: auto; /* 수직 스크롤을 활성화합니다. */
 max-height: 100vh; /* 스크롤 가능한 div의 최대 높이 설정 */
`

/**
 * 그룹 리스트 구분 선
 */
export const GroupList_HR = styled.hr`
    position: relative;
    outline: 0;
    border: 0;
    border-radius: 50px;
    background: #393E46;
    height: .2em;
    max-width: 30px;
    margin-block: 10px;
`

export const NavigateState = styled.div<navigatePram>`
 
 background-color : ${props=> props.$isClick ?`#EEEEEE`: "transParent"};
 width:5px;
 height: 5px;
 border-radius: 50px;
 display: flex;
 position:absolute;
 left:-26%;
 
`

/**
 * 그룹 리스트의 아이콘
 */
export const Li_GroupList_Item = styled.li<navigatePram>`
 height: 50px;
 width: 50px;
 position: relative;
 display: flex;
 align-items: center;
 justify-content: center;
 list-style: none;
 margin-block: 8px;
 background-color:  ${props => (props.$isClick  ? "#007bff" : "#393E46")};
 border-radius:  ${props => (props.$isClick  ? "19px" : "50px")};
 white-space: nowrap;
 cursor: pointer;
 
 transition: background-color 0.3s ease;
 transition: border-radius 0.3s ease;
 &:hover {

      ${NavigateState} {
       transition: border-radius 0.3s ease, height 0.3s ease, background-color 0.3s ease; /* 변경된 부분 */
       border-radius: 15px;
       height: 18px;
       background-color: white;
      }
  background-color: #007bff;
  border-radius: 19px;
 }
 font-weight: bold;
`



/**그룹리스트별 알림 갯수 */
export const SignOfMessageNum = styled.div<receivedMsg>`
 padding: 1px 6px;
 background-color:  ${props => (props.$existMessage  ? "#1AB5E6" : "transparent")};

 color: white;
 padding: ${props => (props.$existMessage  ? "3px 3px" : "")};
 border-radius: 50%;
 font-size: 12px;
 position: absolute;
 margin-top: 2.4em;
 left: 2.7em;
`

export const GroupListTitle = styled.div`
 overflow: hidden;
`

/**캘린제이 아이콘 */
export const Btn_CalenJ_Icon = styled.button`
 appearance: none;
 list-style: none;
 background-color: #393E46;
 height: 50px;
 width: 50px;
 border:0;
 border-radius: 50px;
 overflow: hidden;
 margin-block: 8px;
 background-image: url("/image/calenj_logo.png");
 background-size: 35px;
 background-position:center;
 background-repeat: no-repeat;
 
 transition: background-color 0.3s ease;
 transition: border-radius 0.3s ease;
 &:hover {
  background-color: #007bff;
  border-radius: 10px;
  animation: ${shakeAnimation} 0.3s ease-out 1s forwards;
 }
`


/**그룹 생성 버튼*/
export const Btn_MakeGroup = styled.button`
 appearance: none;
 list-style: none;
 background-color: #393E46;
 height: 50px;
 width: 50px;
 border:0;
 border-radius: 50px;
 overflow: hidden;
 margin-block: 8px;
 font-size:20px;
 transition: background-color 0.3s ease;
 transition: border-radius 0.3s ease;
 &:hover {
  background-color: rgb(51,153,51);
  border-radius: 10px;
 }
`










