import styled from 'styled-components';
import {BackGroundColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";
import FullCalendar from "@fullcalendar/react";

export const SubNavigation_Container_width: number = 232;
export const SubNavigateTopBar_height: number = 32;
export const SubNavigate_padding: number = 14;
export const SubNavigate_paddingBlock: number = 10;
export const subNavigateBorder = 1.2;
export const SubNavigationItem_height: number = 30;
export const SubNavigationItem_margin: number = 5;
export const SubNavigationItem_marginInline: number = 7;

interface SubNavigationClickProps {
    $isClick: boolean;
}


export const SubNavigation_Container = styled.div`
    border-radius: 10px 0 0 0;
    min-width: ${SubNavigation_Container_width}px;
    height: 100%;
    background-color: ${ThemeColor3};
`

export const SubNavigateTopBar_Container = styled.div<SubNavigationClickProps>`
    height: ${SubNavigateTopBar_height}px;
    padding: ${SubNavigate_padding}px;
    padding-block: ${SubNavigate_paddingBlock}px;
    border-bottom: ${subNavigateBorder}px ${BackGroundColor} solid;
    background-color: ${props => props.$isClick ? 'rgba(255, 255, 255, 0.1)' : ThemeColor3};
    border-radius: 10px 0 0 0;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`

export const SubNavigateTopBar_Content_Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    text-align: left;

`
export const SubNavigateTopBar_leftContent = styled.div`
    height: 100%;
    width: 80%;
    font-size: 16px;
    align-content: center;
`


export const SubNavigateTopBar_EventSelecter_Container = styled.div`
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
export const SubNavigateTopBar_rightContent_item = styled.div`
    width: 25px;
    height: 25px;
    font-size: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -1px;
    cursor: pointer;
`
export const SubNavigateContents_Container = styled.div`
    width: 100%;
    height: 100%;
`

export const SubNavigateItem_Content = styled.div`
    height: 100%;
    width: 90%;
    font-size: 16px;
    align-content: center;
    margin-left: 10px;
    color: inherit;
`

export const SubNavigateItem_Icon = styled.div`
    height: 100%;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: inherit;
`

export const SubNavigateItem_Container = styled.div<SubNavigationClickProps>`
    width: calc(100% - ${SubNavigationItem_marginInline * 2 + SubNavigationItem_margin * 2}px);
    height: ${SubNavigationItem_height}px;
    text-align: left;
    font-size: 15px;
    display: flex;
    flex-direction: row;
    margin: ${SubNavigationItem_margin}px;
    margin-inline: ${SubNavigationItem_marginInline}px;
    padding: ${SubNavigationItem_margin}px;
    border: 5px;
    background-color: ${props => props.$isClick ? BackGroundColor : ''};

    color:${TextColor}CC;

    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: ${BackGroundColor};

        ${SubNavigateItem_Icon} {
            color: ${TextColor};
        }

        ${SubNavigateItem_Content} {
            color: ${TextColor};
        }
    }
`


export const Hr_SubNavigation = styled.hr`
    margin: 10px;
    height: 2px;
    background-color: ${ThemeColor2};
    border: 0;
    border-radius: 10px;
`


export const ListToggleDiv = styled.div`
    margin-left: 5px;
    color: gray;
    margin-top: 20px;
    font-size: 12px;

    &:hover {
        color: ${TextColor};
    }
`

export const GroupEventCalendar_Container = styled.div`
    width: calc(100% - 10px);
    height: 240px;
    margin : 5px;
    padding-inline:10px;
    position: relative;
    z-index: 0;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: ${ThemeColor3};

    .fc-popover {
        background: ${BackGroundColor};
        z-index: 1;
        color: ${TextColor}
    }

    .fc-event, .fc-event .fc-event-title {
        color: unset; /* 상위 div의 기본 색상 제거 */
    }

    .fc-daygrid-event {
        z-index: auto !important;
    }

    .fc-popover-body {
        height: 100px;
        overflow-y: auto;
    }
    
    .fc-header-toolbar { //상단 헤더
        margin-block: 5px;
    }

    .fc-daygrid-day-top {
        flex-direction: unset;
        font-size: 10px;
    }
    .fc-toolbar-title{
        margin-left: 0.5em;
        font-size: 15px;
    }
    .fc-header-toolbar{
        margin-bottom : 10px;
    }


    .fc-icon-chevron-left::before{
        font-size: 15px;
    }
    .fc-icon-chevron-right::before{
        font-size: 15px;
        margin-top: 50px;
    }
    .fc-daygrid-day-events{
        min-height: 10px;
    }
    .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{
        min-height: 10px;

    }

    .fc-col-header-cell-cushion{
        font-size: 12px;
    }
    //날짜
    .fc-daygrid-day-number{
        padding:0;
        padding-inline: 4px;
    }
    .fc .fc-toolbar.fc-header-toolbar {
         margin-bottom: 10px;
    }

    //테두리
    .fc-theme-standard td, .fc-theme-standard th {
        border: 1px solid ${TextColor}77;
    }
    .fc-theme-standard .fc-scrollgrid {
        border: 1px solid ${TextColor}77;
    }
`

export const GroupFullCalendar = styled(FullCalendar)`
    display: grid;
    grid-template-columns: 1fr;
`;

export const Controller_Container = styled.div`
    position: absolute;
    width: auto;
    height: 25px;
    padding-inline: 15px;
    display: flex;
    flex-direction: row;
    justify-content: right;
    z-index: 5;
    left: 200px;
    margin-top: 5px;
`
export const Controller_Button = styled.button`
    width: 20px;
    height: 100%;
    display: flex;
    border-radius: 0;
    justify-content: center;
    align-items: center;
    background-color: ${ThemeColor2};
    color: ${TextColor}77;
    font-weight: 550;

    &:hover {
        background-color: ${ThemeColor2}77;
        color: ${TextColor};
    }

`