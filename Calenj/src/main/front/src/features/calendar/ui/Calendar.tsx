import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { INITIAL_EVENTS, createEventId } from "../utils/event-utils";
import { useCalendar } from "../model/useCalendar";
import { GridCalendar_Container } from "./CalendarStyled";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";

export const Calendar: React.FC = () => {
    const { handleEvents, handleDateSelect, handleEventClick } = useCalendar();

    return (
        <GridCalendar_Container>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                editable={true}
                initialEvents={INITIAL_EVENTS}
                locale="ko"
                headerToolbar={{
                    left: "prevYear,prev,next,nextYear today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                height="99.5%"
                eventsSet={handleEvents}
                select={handleDateSelect}
                eventClick={handleEventClick}
            />
        </GridCalendar_Container>
    );
};
