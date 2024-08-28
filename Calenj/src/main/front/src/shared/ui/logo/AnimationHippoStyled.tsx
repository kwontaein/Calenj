import styled, {keyframes} from "styled-components";
import {Ear} from "./HippoStyled";

export const shake = keyframes`
    0% {
        transform: rotate(-280deg);
    }
    25%{
        transform: rotate(-260deg);
        margin-top: 25px;
    }
    50%{
        transform: rotate(-280deg);
        margin-top: 20px;
    }
    75%{
        transform: rotate(-300deg);
    }
    100%{
        transform: rotate(-280deg);
    }
`;

export const ShakeTail = styled.div`
    width: 10px;
    height: 7px;
    background-color: #8e8e8e;
    border-radius: 30px 30px 10px 10px;
    margin-left: -7px;
    margin-top: 20px;
    border:3px solid black;
    border-bottom: none;
    transform: rotate(-280deg);
    animation: ${shake} 3s infinite;  // 애니메이션 적용
    z-index: -1;
`

export const moveMouse = keyframes`
    0% {
        height: 2px;
    }
    45%{
        height: 2px;
    }
    50%{
        height: 4px;
        border-radius: 0 0 5px 5px;
    }
    55%{
        height: 2px;
    }
    100%{
        height: 2px;
    }
`;


export const Move_Mouse_Piece = styled.div`
    width: 25px;
    height: 2px;
    box-sizing: border-box;
    border: 1px solid black;
    background-color: #bb8989;
    margin-left: 5px;
    font-size: 30px;
    color: black;
    position: relative;
    animation: ${moveMouse} 5s infinite; // 애니메이션 적용
`

export const moveEar = keyframes`
    0% {
        transform: rotate(-45deg);
    }
    20%{
        transform: rotate(-45deg);
    }
    25%{
        transform: rotate(-60deg);
    }
    27%{
        transform: rotate(-45deg);
    }
    30%{
        transform: rotate(-60deg);
    }
    32%{
        transform: rotate(-45deg);
    }
    100%{
        transform: rotate(-45deg);
    }
`;

export const Move_LeftEar = styled(Ear)`
    height: 8px;
    border-radius: 20px 15px 0 0;
    transform: rotate(-45deg);
    border: 3px solid black;
    border-bottom: none;
    top: -27px;
    left: 68px;
    animation: ${moveEar} 3s infinite; // 애니메이션 적용
    position: relative;
    z-index: 1;
`;