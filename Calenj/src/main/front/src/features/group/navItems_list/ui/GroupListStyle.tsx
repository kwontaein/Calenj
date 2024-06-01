import styled, { keyframes } from 'styled-components';
import {PointColor, TextColor, ThemaColor3} from "../../../../shared/ui/SharedStyled";
import {SubNavigation_Container_width} from "../../subNavItems/ui/GroupSubNavigationStyle";

/** 받은 메시지가 있는지 확인하기 위한 Props*/
interface receivedMsg {
 $existMessage:boolean
}
interface navigatePram {
  $isClick : boolean
}



export const GroupList_Container_width :number =72;
export const GroupListContent_Container_marginInline = 22;
export const GroupListContent_Container_width : number =SubNavigation_Container_width+GroupList_Container_width;

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
    width: auto;
    height:100%;
    display: flex;
    flex-direction: row;
`

/**
 * 그룹 리스트의 내용을 담는 컨테이너
 */
export const GroupListContent_Container = styled.div`
     width:auto;
     display: flex;
     flex-direction: column;
     height: 100%; /* 스크롤 가능한 div의 최대 높이 설정 */
     text-align: center;
     padding-inline: ${GroupListContent_Container_marginInline/2}px;
     overflow-y: auto; /* 수직 스크롤을 활성화합니다. */
`

/**
 * 그룹 리스트 구분 선
 */
export const GroupList_HR = styled.div`
    outline: 0;
    border: 0;
    border-radius: 50px;
    background: ${ThemaColor3};
    height: .2em;
    width:30px;
    margin-block: 10px;
    margin-inline :10px;
`

export const NavigateState = styled.div<navigatePram>`
     background-color : ${props=> props.$isClick ? TextColor: "transParent"};
     width: ${props=> props.$isClick ? 5.5: 5}px;
     height: ${props=> props.$isClick ? 40 : 5}px;
     border-radius: 50px;
     display: flex;
     position:absolute;
     left:-2px;
`

/**
 * 그룹 리스트의 아이콘
 */
export const Li_GroupList_Item = styled.li<navigatePram>`
     height: 50px;
     width: 50px;
     display: flex;
     align-items: center;
     justify-content: center;
     list-style: none;
     margin-block: 8px;
     background-color:  ${props => (props.$isClick  ? PointColor : ThemaColor3)};
     border-radius:  ${props => (props.$isClick  ? "19px" : "50px")};
     white-space: nowrap;
     cursor: pointer;
        
     transition: background-color 0.3s ease,border-radius 0.3s ease;
     &:hover {
          ${NavigateState} {
           transition: border-wsz2  w2radius 0.3s ease, height 0.3s ease, background-color 0.3s ease, height 0.3s ease; /* 변경된 부분 */
           border-radius: 20px;
           height: ${props=>props.$isClick ? 40 : 18}px;
           background-color: white;
          }
      background-color: ${PointColor};
      border-radius: 19px;
     }
     font-weight: bold;
`



/**그룹리스트별 알림 갯수 */
export const SignOfMessageNum = styled.div<receivedMsg>`
     padding: 1px 6px;
     background-color:  ${props => (props.$existMessage  ? "#1AB5E6" : "transparent")};
     width: ${props => (props.$existMessage  ? "15px" : "")};
     height: ${props => (props.$existMessage  ? "15px" : "")};
     color: white;
     padding: ${props => (props.$existMessage  ? "3px 3px" : "")};
     border-radius: 50%;
     font-size: 12px;
     position: absolute;
     margin-top: 2.4em;
     left: 2.7em;
`

export const GroupListTitle = styled.div`
     width: 100%;
     overflow: hidden;
     font-size: 13px;
`

/**
 @param GroupTitleView_Container
 MouseHover 시 뜨는 그룹제목 Contaienr
 */
export const GroupTitleView_Container = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    position: fixed;
    left: 4.5em;
`
export const GroupTitleViewTail = styled.div`
    background-color: black;
    width: 10px;
    height: 10px;
    transform:rotate(45deg);
    
`
export const GroupTitleViewContent = styled.div`
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    left: 5px;
    font-size: 14px;
`

/**캘린제이 아이콘 */
export const Btn_CalenJ_Icon = styled.button<navigatePram>`
     appearance: none;
     list-style: none;
     background-color: ${props => props.$isClick ? PointColor :ThemaColor3 };
     height: 50px;
     width: 50px;
     border:0;
     border-radius: ${props => props.$isClick ? "15px" : "50%" };
     overflow: hidden;
     margin-block: 8px;
     background-image: url("/image/calenj_logo.png");
     background-size: 35px;
     background-position:center;
     background-repeat: no-repeat;
     
     transition: background-color 0.3s ease,border-radius 0.3s ease;
     &:hover {
      background-color: ${PointColor};
      border-radius: 15px;
      animation: ${shakeAnimation} 0.3s ease-out 1s forwards;
     }
`


/**그룹 생성 버튼*/
export const Btn_MakeGroup = styled.button`
     appearance: none;
     list-style: none;
     background-color: ${ThemaColor3};
     height: 50px;
     width: 50px;
     border:0;
     border-radius: 50px;
     overflow: hidden;
     margin-block: 8px;
     font-size:20px;
     transition: background-color 0.3s ease,border-radius 0.3s ease;
     &:hover {
      background-color: rgb(51,153,51);
      border-radius: 10px;
     }
`










