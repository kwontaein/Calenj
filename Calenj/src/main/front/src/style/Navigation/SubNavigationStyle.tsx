import styled from 'styled-components';
import {BackGroundColor, TextColor, ThemaColor2, ThemaColor3} from "../FormStyle";

export const SubNavigation_Container_width:number  = 232;
export const SubNavigateTopBar_hegiht: number =32;
export const SubNavigate_padding: number =14;
export const SubNavigationItem_hegiht: number =30;
export const SubNavigationItem_margin: number =5;
export const SubNavigationItem_marginInline: number =7;


export const SubNavigation_Container = styled.div`
    border-radius: 10px 0 0 0;
    min-width: ${SubNavigation_Container_width}px;
    height: 100%;
    background-color: ${ThemaColor3};
`


export const SubNavigateTopBar = styled.div`
    height: ${SubNavigateTopBar_hegiht}px;
    padding: ${SubNavigate_padding}px;
    display: flex;
    flex-direction: row;
    border-bottom: 1.2px #222831 solid;
    background-color: ${ThemaColor3};
    border-radius: 10px 0 0 0;
    text-align: left;
`
export const SubNavigateTopBar_leftContent =styled.div`
    height: 100%;
    width: 80%;
    font-size: 16px;
    align-content: center;
`


export const SubNavigateTopBar_EventSelecter_Container =styled.div`
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const SubNavigateTopBar_rightContent_item = styled.div`
    width: 25px;
    height: 25px;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:-1px;
    cursor:pointer;
`
export const SubNavigateContents_Container = styled.div`
    width: 100%;
    height: 100%;

`

export const SubNavigateItem_Content =styled.div`
    height: 100%;
    width: 90%;
    font-size: 16px;
    align-content: center;
    margin-left: 10px;
    color: #797979;
`

export const SubNavigateItem_Icon =styled.div`
    height: 100%;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #797979;
`

export const SubNavigateItem_Container = styled.div`
    width: calc(100% - ${SubNavigationItem_marginInline*2 + SubNavigationItem_margin*2}px);
    height: ${SubNavigationItem_hegiht}px;
    text-align: left;
    font-size: 15px;
    display: flex;
    flex-direction: row;
    margin: ${SubNavigationItem_margin}px;
    margin-inline:${SubNavigationItem_marginInline}px;
    padding: ${SubNavigationItem_margin}px;
    border: 5px;
        transition: background-color 0.3s ease;
        transition: color 0.3s ease;
    &:hover{
        background-color: ${BackGroundColor};
        ${SubNavigateItem_Icon}{
            color: ${TextColor};
        }
        ${SubNavigateItem_Content}{
            color: ${TextColor};
        }
    }
`



export const Hr_SubNavigation =styled.hr`
    margin: 10px;
    height: 2px;
    background: ${ThemaColor2};
    border: 0px;
    border-radius: 10px;
`


