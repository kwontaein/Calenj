import styled from "styled-components";
import {topContent_HeightSize} from "./SubNavProfileTopStyled";
import {PointColor, TextColor, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const SubNavProfile_Container= styled.div`
    width: calc(100% - 20px);
    height : 120px;
    padding:10px;
`

export const SubNavProfile_Content_Container =styled.div`
    height: calc(100% - ${topContent_HeightSize+15}px); // + padding
    padding-top: 15px;
    display: flex;
    flex-direction: row;
`

export const Profile_Container = styled.div`
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
`
export const SubNavProfile_div = styled.div`
    height: 50px;
    width: 50px;
    background-color: ${TextColor};
    border-radius: 50%;
    display: flex;
`
export const SubNavEmpty_div= styled.div`
    margin-top: 30px;
    margin-left: 29px;
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: ${ThemeColor3};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ProfileEditButton_div = styled.div`
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    font-size: 18px;
    align-items: center;
    justify-content: center;
    color: ${TextColor};
    background-color: ${PointColor};
    &:hover{
        background-color: ${PointColor}77;
    }
`

export const ProfileText_Container = styled.div`
    width: calc(100% - 72px); //60+72
    height: 55px;
    margin-left: 12px;
`

export const NickName_Container = styled.div`
    width: 100%;
    height: 30%;
    font-size: 14px;
`
export const Introduction_Container = styled.div`
    width:calc(100% - 2px);
    max-width: 147px;
    height: 20%;
    font-size: 9px;
    padding-left: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-block: 4%;
`
export const FriendsNum_Container = styled.div`
    width:calc(100% - 2px);
    padding-left: 2px;
    height: 28%;
    font-size: 11px;
    margin-top: 4%;
`

