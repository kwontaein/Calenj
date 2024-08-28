import styled, {keyframes} from 'styled-components';
import {PointColor, PointColor2, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

/** 받은 메시지가 있는지 확인하기 위한 Props*/



export const GroupList_Container_width: number = 72;


export const SideAlarm_TitleView_Container = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    position: fixed;
    left: 4.5em;
    z-index: 2;
`
export const SideAlarm_TitleViewTail = styled.div`
    background-color: ${ThemeColor2};
    width: 10px;
    height: 10px;
    transform: rotate(45deg);

`
export const SideAlarm_TitleViewContent = styled.div`
    background-color: ${ThemeColor2};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    left: 5px;
    font-size: 14px;
`


export const NavigateState = styled.div<{ $isClick:boolean }>`
    background-color: ${props => props.$isClick ? TextColor : "transParent"};
    width: ${props => props.$isClick ? 5.5 : 5}px;
    height: ${props => props.$isClick ? 40 : 5}px;
    border-radius: 50px;
    display: flex;
    position: absolute;
    left: -2px;
`









