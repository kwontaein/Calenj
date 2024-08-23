import React from "react";
import styled, {keyframes} from "styled-components";
import {RowFlexBox, TextColor, ThemeColor3} from "../SharedStyled";


const HippoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -80px;
    position: relative;
    z-index: 3;
    margin-left: 30px;
`;

const Hippo = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    margin-left: -40px;
`;


const Body = styled.div`
    width: 90px;
    height: 70px;
    background-color: #8e8e8e;
    border-radius: 80px 70px 70px 60px;
    position: relative;
    border: 3px solid black;
    box-shadow: -10px 0 15px rgba(0, 0, 0, 0.5);
`;

const Head = styled.div`
    width: 90px;
    height: 80px;
    background-color: #8e8e8e;
    border-radius: 80px 80px 95px 95px;
    position: relative;
    top: -30px;
    left: 50px;
    border: 3px solid black;
    border-right: none;
    z-index: 2;
`;



const Mouse = styled.div`
    width: 70%;
    height: 60%;
    background-color: #8e8e8e;
    border-radius: 40px 35px 7px 60px;
    position: relative;
    top: 6px;
    left: -17px;
    border: 3px solid black;
    border-right: none;
    transform: rotate(5deg) translateZ(0);
    z-index: 2;
`
const Mouse_Piece = styled.div`
    width: 20px;
    height: 2px;
    margin-left: 5px;
    background-color: black;
    font-size: 30px;
    color: black;
    position: relative;
`

// 깜빡이는 애니메이션 정의
const blink = keyframes`
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
const Eye = styled.div`
    width: 8px;
    height: 8px;
    background-color: #4a4a4a;
    border-radius: 50%;
    position: relative;
    animation: ${blink} 10s infinite;  // 애니메이션 적용
`;

const RightEye = styled(Eye)`
    top: 13px;
    left: 45px;
`;

const Nose_Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-inline: 35%;
    box-sizing: border-box;
    justify-content: space-between;
    margin-top: 5px;
    margin-left: -10px;
`
const Nose = styled.div`
    width: 5px;
    height: 5px;
    background-color: #4a4a4a;
    border-radius: 50%;
    position: relative;
`;



const Tooth = styled.div`
    width: 3px;
    height: 4px;
    border: 2px solid black;
    background-color: white;
    position: relative;
`;

const Ear_Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Ear = styled.div`
    width: 10px;
    height: 10px;
    background-color: #8e8e8e;
    border-radius: 50%;
    position: relative;
    z-index: 0;
`;

const LeftEar = styled(Ear)`
    height: 8px;
    border-radius: 20px 15px 0 0;
    transform: rotate(-45deg);
    border: 3px solid black;
    border-bottom: none;
    left: -5px;
`;

const RightEar = styled(Ear)`
    height: 10px;
    border-radius: 20px 25px 0 0;
    transform: rotate(43deg);
    border: 3px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: none;
`;

const RightEar_Piece = styled.div`
    width :50%;
    height:60%;
    border-radius: 5px;
    background-color: ${ThemeColor3};
`

const LegsContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    left: 10px;
`;

const Leg = styled.div`
    width: 15px;
    height: 50px;
    background-color: #8e8e8e;
    border-radius: 0 0 5px 5px;
    border:3px solid black;
    border-top: none;
`;

const Right_FrontLeg = styled(Leg)`
    width: 12px;
    height: 25px;
    margin-top: -30px;
    margin-left: 3px;
`
const FrontLeg = styled(Leg)`
    margin-left: 10px;
    margin-top: -5px;
    height: 10px;
`;

const BackLeg = styled(Leg)`
    margin-top: -47px;
    margin-right: 10px;
    border-left: none;
    display: flex;
    align-items: end;
`;

const Tail = styled.div`
    width: 10px;
    height: 7px;
    background-color: #8e8e8e;
    border-radius: 30px 30px 10px 10px;
    margin-left: -7px;
    margin-top: 20px;
    border:3px solid black;
    border-bottom: none;
    transform: rotate(70deg);
`
export const HippoComponent :React.FC = () => {
    return (
        <HippoContainer>
            <Hippo>
                <Head>
                    <Ear_Container>
                        <LeftEar/>
                        <RightEar>
                            <RightEar_Piece/>
                        </RightEar>
                    </Ear_Container>
                    <RightEye/>
                    <Mouse>
                        <Nose_Container>
                            <Nose/>
                            <Nose/>
                        </Nose_Container>
                        <div style={{position:'relative',top:'20px', left:'10px', display:'flex'}}>
                            <Mouse_Piece/>
                            <Tooth/>
                        </div>
                    </Mouse>
                </Head>
                <div>
                    <Body/>
                    <LegsContainer>
                        <FrontLeg />
                        <BackLeg>
                            <div style={{borderLeft:'3px solid black', height:'30% '}}>

                            </div>
                        </BackLeg>
                    </LegsContainer>
                    <Right_FrontLeg/>
                </div>
                <Tail/>
            </Hippo>
        </HippoContainer>
    );
};

