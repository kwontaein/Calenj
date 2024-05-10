import styled from 'styled-components';
import {SubNavigateTopBar_hegiht, SubNavigate_padding} from "./SubNavigationStyle";
import {BackGroundColor, PointColor, TextColor, TextColor3, ThemaColor2, ThemaColor3} from "../FormStyle";
import {GroupUserList_Container_width} from '../Group/GroupUserListStyle'

interface ScreenModeProps{
    $screenRowFlex :boolean,
    $showUserList?:boolean,
}
interface CustomScreenProps{
    $mode:string,
    $width?:number,
    $height?:number,
}
interface GroupUserListProps{
    $isClick:boolean,
}

export const EventTopBar_Container = styled.div`
    width: calc(100% -${SubNavigate_padding*2}px);
    height: ${SubNavigateTopBar_hegiht}px;
    padding: ${SubNavigate_padding}px;
    background-color : ${ThemaColor2};
    border-bottom: 1.2px ${BackGroundColor} solid;
    display: flex;
    flex-direction: row;
    justify-content: right ;
`

export const EventTopBarContent = styled.div<GroupUserListProps>`
    width: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${props => props.$isClick ? TextColor : TextColor3};
    &:hover{
        color: ${TextColor};   
    }
`
export const EventTopBarSubContent = styled.div`
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${TextColor3};
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
    width:${props=>props.$showUserList? `calc(100% - ${GroupUserList_Container_width}px)`: `100%`};
    height: 100%;
    display: flex;
    flex-direction: ${props => props.$screenRowFlex? "row" :"column"};
`

export const CustomScreen_MessageBox_Contaienr = styled.div.attrs<CustomScreenProps>(props => ({
    style:{ width : props.$mode ==="column" && props.$width ? "100%" : `${100-(props.$width||0)}%`,
            height: props.$mode ==="row" ? "100%" : `calc(100% - ${props.$height}px)`}
}))``

export const CustomScreen_SubContent_Contaienr = styled.div.attrs<CustomScreenProps>(props => ({
    style:{ width :props.$mode ==="column" ? "100%" :`${props.$width}%`,
        height : props.$mode ==="row" ? "100%" : `${props.$height}px`}
}))`
    display: flex;
    flex-direction: ${[props => props.$mode]};
`



export const CustomScreen_MiddleLine_div = styled.div<CustomScreenProps>`
    width:  ${props => props.$mode ==="row" ? "3px" : "100%"};
    height:  ${props => props.$mode ==="column" ? "3px" : "100%"};
    background-color: ${ThemaColor3};
    transition : background-color 0.3s ease;
    cursor: ${props => props.$mode ==="row" ? "col-resize" : "row-resize"};
    &:hover{
        background-color: ${PointColor};
    }
`
