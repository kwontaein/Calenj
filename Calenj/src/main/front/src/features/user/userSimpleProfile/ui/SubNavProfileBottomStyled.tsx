import styled from "styled-components";
import {PointColor, TextColor} from "../../../../shared/ui/SharedStyled";
export const topContent_HeightSize = 25;


export const SubNavProfileTop_Container = styled.div`
    width: 100%;
    height:${topContent_HeightSize}px;    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const SubNavProfileTop_Content = styled.div`
    max-width: calc(62% - 10px);
    margin-right: 10px;
`
export const Logout_Button = styled.button`
    height: 100%;
    width: 50px;
    font-size: 10px;
`

export const SubProfileTopMenu_Container = styled.div`
    width: 38%;
    display: flex;
    flex-direction: row;
    justify-content: left;
`
export const ProfileIcon_Container = styled.div`
    font-size: 15px;
    color : ${TextColor};
`

export const ProfileClickPointer_Container = styled.div<{$isClick:boolean}>`
    height: ${topContent_HeightSize}px;
    width: ${topContent_HeightSize}px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: background-color 0.3s ease,border-radius 0.3s ease;
    background-color: ${props=>props.$isClick ? PointColor : 'transparent'};
    &:hover{
        background-color: ${PointColor};
        ${props => props.$isClick && `border-radius: 20px;`}
    }
`