import styled from 'styled-components';
import {SubNavigateTopBar_hegiht, SubNavigate_padding} from "../../../subNavItems/group/ui/GroupSubNavigationStyle";
import {
    BackGroundColor,
    PointColor, SubScreenColor,
    TextColor,
    TextColor2,
    ThemaColor2,
} from "../../../../style/FormStyle";
import {GroupUserList_Container_width} from '../../../../style/Group/GroupUserListStyle'

export const MiddleLine_Size = 3;
interface ScreenModeProps{
    $screenRowFlex :boolean,
    $showUserList?:boolean,
}
interface CustomScreenProps{
    $mode:string,
    $clickState:boolean,
    $width?:number,
    $height?:number,
}
interface  CustomSubScreenProps{
    $mode:string,
    $screenRowFlex:boolean,
    $absoluteWidth:number,
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
    color: ${props => props.$isClick ? TextColor : TextColor2};
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
    color: ${TextColor2};
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

export const CustomScreen_MessageBox_Container = styled.div.attrs<CustomScreenProps>(props => ({
    style:{ width : props.$clickState ?'100%' : props.$mode ==="column" ? "100%" : `${100-(props.$width||0)}%`,
            height: props.$clickState ?'100%' : props.$mode ==="row" ? "100%" : `calc(100% - ${props.$height}px)`}
}))`
    position: relative;
    margin-top: ${props=>!props.$clickState && props.$mode==="column" ? `${props.$height}px`:0};
`

export const CustomScreen_SubContent_Container = styled.div.attrs<CustomSubScreenProps>(props => ({
    style:{ width : props.$mode ==="row" ? `${props.$width}%`: `${props.$absoluteWidth}px`,
        height :  props.$mode ==="row" ? "100%" : `${props.$height}px`}
}))`
    display: flex;
    flex-direction: ${props => props.$mode};
    position: ${props => props.$mode ==="row" ? "relative" : "absolute"};
`




