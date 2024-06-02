import styled, {createGlobalStyle} from "styled-components";
import FullCalendar from "@fullcalendar/react";

export const GridCalendar_Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
`
export const StyledFullCalendar = styled(FullCalendar)`
    .fc-day-sun a {
        color: red;
    }

    /* 토요일 날짜: 파란색 */
    .fc-day-sat a {
        color: blue;
    }
    
`;