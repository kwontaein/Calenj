import styled, {keyframes} from "styled-components";
import {ThemeColor3} from "../SharedStyled";

const HippoColor = "#8e8e8e";

export const HippoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -80px;
    position: relative;
    z-index: 3;
    margin-left: 30px;
`;

export const Hippo = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    margin-left: -40px;
`;


export const Body = styled.div`
    width: 90px;
    height: 70px;
    background-color: ${HippoColor};
    border-radius: 80px 70px 70px 60px;
    position: relative;
    border: 3px solid black;
    box-shadow: -10px 0 15px rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

export const Head = styled.div`
    width: 90px;
    height: 80px;
    background-color: ${HippoColor};
    border-radius: 80px 80px 95px 95px;
    position: relative;
    top: -30px;
    left: 50px;
    border: 3px solid black;
    border-right: none;
    z-index: 2;
`;



export const Mouse = styled.div`
    width: 70%;
    height: 60%;
    background-color: ${HippoColor};
    border-radius: 40px 35px 7px 60px;
    position: relative;
    top: 6px;
    left: -17px;
    border: 3px solid black;
    border-right: none;
    transform: rotate(5deg) translateZ(0);
    z-index: 2;
`
export const Mouse_Piece = styled.div`
    width: 20px;
    height: 2px;
    box-sizing: border-box;
    border: 1px solid black;
    margin-left: 5px;
    font-size: 30px;
    color: black;
    position: relative;
`

// 깜빡이는 애니메이션 정의
export const blink = keyframes`
    0% {
        height: 8px;
        width: 8px;
    }
    70%{
        height: 8px;
        width: 8px;
        margin-top:0;
    }
    75% {
        height: 2px;
        width: 12px;
        margin-top: 6px;
    }
    80%{
        height: 8px;
        width: 8px;
        margin-top:0;
    }
    100%{
        height: 8px;
        width: 8px;
    }
    
`;

// Eye 컴포넌트 정의
export const Eye = styled.div`
    width: 8px;
    height: 8px;
    background-color: #4a4a4a;
    border-radius: 50%;
    position: relative;
    animation: ${blink} 8s infinite;  // 애니메이션 적용
`;

export const RightEye = styled(Eye)`
    top: 13px;
    left: 45px;
`;

export const Nose_Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-inline: 35%;
    box-sizing: border-box;
    justify-content: space-between;
    margin-top: 5px;
    margin-left: -10px;
`
export const Nose = styled.div`
    width: 5px;
    height: 5px;
    background-color: #4a4a4a;
    border-radius: 50%;
    position: relative;
`;



export const Tooth = styled.div`
    width: 3px;
    height: 4px;
    border: 2px solid black;
    background-color: white;
    position: absolute;
    left: 25px;
`;

export const Ear_Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const Ear = styled.div`
    width: 10px;
    height: 10px;
    background-color: #8e8e8e;
    border-radius: 50%;
    position: relative;
    z-index: 0;
`;

export const LeftEar = styled(Ear)`
    height: 8px;
    border-radius: 20px 15px 0 0;
    transform: rotate(-45deg);
    border: 3px solid black;
    border-bottom: none;
    left: -5px;
`;

export const RightEar = styled(Ear)`
    height: 10px;
    border-radius: 20px 25px 0 0;
    transform: rotate(43deg);
    border: 3px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: none;
`;

export const RightEar_Piece = styled.div`
    width :50%;
    height:60%;
    border-radius: 5px;
    background-color: ${ThemeColor3};
`

export const LegsContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    left: 10px;
`;

export const Leg = styled.div`
    width: 15px;
    height: 50px;
    background-color: ${HippoColor};
    border-radius: 0 0 5px 5px;
    border:3px solid black;
    border-top: none;
    z-index: 1;
`;

export const Right_FrontLeg = styled(Leg)`
    width: 12px;
    height: 25px;
    margin-top: -30px;
    margin-left: 3px;
    z-index: 0;
`
export const FrontLeg = styled(Leg)`
    margin-left: 10px;
    margin-top: -5px;
    height: 10px;
`;

export const BackLeg = styled(Leg)`
    margin-top: -47px;
    margin-right: 10px;
    border-left: none;
    display: flex;
    align-items: end;
    border-radius: 0 5px 0 0;
`;


export const Tail = styled.div`
    width: 10px;
    height: 7px;
    background-color: ${HippoColor};
    border-radius: 30px 30px 10px 10px;
    margin-left: -7px;
    margin-top: 20px;
    border:3px solid black;
    border-bottom: none;
    transform: rotate(70deg);
`


