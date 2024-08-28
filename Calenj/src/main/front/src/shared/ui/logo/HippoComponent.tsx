import React from "react";
import {
    BackLeg,
    Body,
    Ear_Container, FrontLeg,
    Head,
    Hippo,
    HippoContainer,
    LeftEar, LegsContainer,
    Mouse, Mouse_Piece, Nose, Nose_Container, Right_FrontLeg,
    RightEar,
    RightEar_Piece,
    RightEye, Tail, Tooth
} from "./HippoStyled";


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

