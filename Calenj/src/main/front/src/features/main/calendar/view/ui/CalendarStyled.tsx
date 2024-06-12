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

