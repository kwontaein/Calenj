import {DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/react";

export interface ReturnCalendar {
    handleEvents: (events: EventApi[]) => void,
    handleDateSelect: (selectInfo: DateSelectArg) => void,
    handleEventClick:(clickInfo: EventClickArg) => void,
}
