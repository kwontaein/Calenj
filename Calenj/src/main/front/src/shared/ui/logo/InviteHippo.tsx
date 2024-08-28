import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {Modal_Condition_Button, RowFlexBox, TextColor, ThemeColor3} from "../SharedStyled";
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
    RightEye, Tooth
} from "./HippoStyled";
import {Move_LeftEar, Move_Mouse_Piece, ShakeTail} from "./AnimationHippoStyled";
import {Text_Wrapper} from "./CalenJLogo";
import {GroupDetail, QUERY_GROUP_DETAIL_KEY} from "../../../entities/reactQuery";
import {useQueryClient} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../../entities/redux";


export const InviteHippo :React.FC<{userName:string}> = ({userName}) => {
    const [groupDetail,setGroupDetail] = useState<GroupDetail>();
    const queryClient = useQueryClient();
    const navigateInfo = useSelector((state:RootState) => state.navigateInfo);

    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateInfo.navigateParam]));
    }, [navigateInfo.navigateParam]);

    return (
        <HippoContainer style={{marginTop:'20px', display:'flex', flexDirection:'column', justifyContent:'left', alignItems:'start'}}>
            <Text_Wrapper style={{textAlign:'left', marginLeft:'10px', marginBottom:'50px'}}>
                {userName}님이 {groupDetail?.groupTitle}방에 합류했습니다.
            </Text_Wrapper>
            <Hippo style={{marginBlock:'30px', marginLeft:"10px"}}>
                <Move_LeftEar/>
                <Head>
                    <Ear_Container>
                        <div></div>
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
                            <Move_Mouse_Piece/>
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
                <ShakeTail/>
            </Hippo>
            <Modal_Condition_Button $isAble={true} style={{width:'200px', marginLeft:'40px'}}>
                인사하기
            </Modal_Condition_Button>
        </HippoContainer>
    );
};

