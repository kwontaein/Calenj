import React from "react";
import {useInviteGroup} from "../model/useInviteGroup";
import {
    Accept_Div,
    Back_Div, Bottom_Div, Content_Div, Denied_Div,
    Ear, Ear_Bottom,
    Ear_Bottom_Container,
    Ear_Container, Eye, Eye_Container, Inner_div, Inner_Wrapper_Div,
    Login_Container, Login_div, Member_Cnt_Div, Online_Cnt_Div, Tail_Div, Title_Div
} from "./InviteGroupStyled";

export const InviteGroup: React.FC = () => {
    const [info, joinGroup] = useInviteGroup()

    return (
        <Login_Container>
            <div>
                <Ear_Container>
                    <Ear></Ear>
                    <Ear></Ear>
                </Ear_Container>
                <Back_Div>
                    <Ear_Bottom_Container>
                        <Ear_Bottom></Ear_Bottom>
                        <Ear_Bottom></Ear_Bottom>
                    </Ear_Bottom_Container>
                    <Login_div>
                        <Eye_Container>
                            <Eye/><Eye/>
                        </Eye_Container>
                        <Inner_div>
                            <Inner_Wrapper_Div>
                                <Title_Div>{info?.inviter}님의 초대가 왔어요! <br/> "{info?.groupTitle}" 그룹에 초대받았어요!</Title_Div>
                                <Content_Div>
                                    <Online_Cnt_Div>{info?.onlineCount}명 온라인</Online_Cnt_Div>
                                    <Member_Cnt_Div>멤버 {info?.memberCount}명</Member_Cnt_Div>
                                </Content_Div>
                                <Bottom_Div>
                                    <Accept_Div onClick={joinGroup}>초대 수락하기</Accept_Div>
                                    <Denied_Div onClick={() => document.location.replace("/")}>사양할게요</Denied_Div>
                                </Bottom_Div>
                            </Inner_Wrapper_Div>
                        </Inner_div>
                    </Login_div>
                </Back_Div>
                <Tail_Div/>
            </div>
        </Login_Container>


    )
}

