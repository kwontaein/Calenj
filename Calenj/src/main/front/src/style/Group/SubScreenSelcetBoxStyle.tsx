import styled, { keyframes, css  } from 'styled-components';
import {BackGroundColor, PointColor, TextColor, TextColor2, ThemaColor2, ThemaColor3} from "../FormStyle";

interface OptionProps{
    $option: string,
}
// props에 따라 width와 height을 변경하는 애니메이션 정의
const changeSizeAnimation = keyframes`
    from {
        width: auto;
        justify-content: center;
        border-radius: 30px;
    }

    to {
        width: 200px;
        justify-content: flex-end;
        border-radius: 5px;
    }
`;

const moveAnimation = keyframes`
    0%{
        transform: rotate(0deg);
    }33%{
         transform: rotate(2deg);
     }66%{
          transform: rotate(-2deg);
      }100%{
           transform: rotate(0deg);
       }
`;

// animation: slide2 1s ease 0.2s forwards;
// 컨테이너 스타일 정의
export const SubScreenSelecter_Container = styled.div<OptionProps>`
    width: auto;
    height: auto;
    background-color: ${BackGroundColor};
    position: relative;
    padding-block: 8px;
    padding-left: 8px;
    border-radius: ${props => props.$option === "filter" ? "5px" : "30px"};
    display: flex;
    top: 40px;
    left: 25px;
    display: flex;
    flex-direction: row;
    ${props => props.$option === "filter" && css`
        animation: ${changeSizeAnimation} 1s ease-in-out 2s forwards;
    `}
`;

export const SubScreenIcon_Container=styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: transparent solid;
    background-color: ${ThemaColor2};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    color:${TextColor2};

    font-size: 12px;
    &:hover{
        border:3px solid ${PointColor};
        background-color: ${ThemaColor3};
        color: ${TextColor};
    }
`
