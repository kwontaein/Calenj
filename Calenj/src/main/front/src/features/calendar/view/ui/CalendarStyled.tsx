import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import {BackGroundColor, PointColor, TextColor, ThemeColor2} from "../../../../shared/ui/SharedStyled";


export const GridCalendar_Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
    background-color: ${ThemeColor2};

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
        height: 157px;
        overflow-y: auto;
    }

    .fc-toolbar-title {
        margin-left: 0.5em;
        font-size: 30px;
    }

    .fc-header-toolbar { //상단 헤더
        margin-bottom: 1.0em;
        margin-top: 0.5em;
    }

    .fc-daygrid-day-top {
        flex-direction: unset;
    }
`
export const Draggable_Container = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 5px;
    background-color: rgba(42, 42, 42, 0.9);
    border: 2px solid #7c7c7c;
    text-align: center;
    cursor: pointer;
    user-select: none;
    position: fixed;
    z-index: 3;
`

export const StyledFullCalendar = styled(FullCalendar)`
    display: grid;
    grid-template-columns: 1fr;

`;

export const DeleteList = styled.div`
    border-radius: 5px;
    background-color: rgba(42, 42, 42, 0.9);
    border: 2px solid #7c7c7c;
    text-align: center;
    cursor: pointer;
    padding: 50px;
    user-select: none;
    position: fixed;
    right: 0;
    z-index: 3;
`

