import styled from 'styled-components';
import {SubNavigateTopBar_hegiht, SubNavigate_padding} from "./SubNavigationStyle";
import {BackGroundColor, PointColor, TextColor, ThemaColor2, ThemaColor3} from "../FormStyle";
import {groupUserList_Container_width} from '../Group/GroupUserListStyle'

interface ScreenModeProps{
    $screenRowFlex :boolean;
}
interface CustomScreenProps{
    $mode:string,
    $width?:number,
    $height?:number,
}

export const ContentsByEventTopBar = styled.div`
    height: ${SubNavigateTopBar_hegiht}px;
    padding: ${SubNavigate_padding}px;
    background-color : ${ThemaColor2};
    border-bottom: 1.2px ${BackGroundColor} solid;
    display: flex;
    flex-direction: row;    
`
export const EventTopBar_Container = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 10px;
    display: flex;
    justify-content: right ;
`

export const EventTopBarContent = styled.div`
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #cdcdcd;
    &:hover{
        color: ${TextColor};   
    }
`

export const ContentsScreen_div = styled.div`
    width:100%;
    height: calc(100% - ${SubNavigateTopBar_hegiht + SubNavigate_padding*2}px);
    display: flex;
    flex-direction: row;
`
export const TransContentsScreen_div = styled.div<ScreenModeProps>`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: ${props => props.$screenRowFlex? "row" :"column"};
`
export const CustomScreen_MessageBox_Contaienr = styled.div<CustomScreenProps>`
    width: ${props => props.$mode ==="column" ? "100%" : `${props.$width}px`};
    height: ${props => props.$mode ==="row" ? "100%" : `calc(100% - ${props.$height}px)`};
`
export const CustomScreen_SubContent_Contaienr = styled.div<CustomScreenProps>`
    width: ${props => props.$mode ==="column" ? "100%" : `calc(100% - ${props.$width}px)`};
    height: ${props => props.$mode ==="row" ? "100%" : `${props.$height}px`};
`

export const CustomScreen_MiddleLine_div = styled.div<CustomScreenProps>`
    width:  ${props => props.$mode ==="row" ? "3px" : "100%"};
    height:  ${props => props.$mode ==="column" ? "3px" : "100%"};
    background-color: ${BackGroundColor};
    transition : background-color 0.3s ease;
    cursor: pointer;
    &:hover{
        background-color: ${PointColor};
    }
`