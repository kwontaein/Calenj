import styled, {createGlobalStyle} from "styled-components";
import FullCalendar from "@fullcalendar/react";
import {BackGroundColor, TextColor, ThemaColor2, ThemaColor3} from "../../../../../shared/ui/SharedStyled";
import DatePicker from "react-datepicker";

export const GridCalendar_Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
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
    transition: transform 0.2s ease-out; /* 이동 애니메이션을 부드럽게 적용 */
`

export const StyledFullCalendar = styled(FullCalendar)`
    display: grid;
    grid-template-columns: 1fr;

    .fc-day-sun a {
        color: red;
    }

    /* 토요일 날짜: 파란색 */

    .fc-day-sat a {
        color: blue;
    }

    z-index: 0;

`;


