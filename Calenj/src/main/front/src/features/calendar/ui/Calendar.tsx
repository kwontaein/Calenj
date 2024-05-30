import {useCallback, useState} from "react";
import FullCalendar, {
    DateSelectArg,
    EventApi,
    EventClickArg
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import {INITIAL_EVENTS, createEventId} from "../utils/event-utils";
import {useCalendar} from "../model/useCalendar";

export const Calendar:React.FC =()=> {
    const {handleEvents,handleDateSelect,handleEventClick} = useCalendar()

    return (
        <div className="demo-app">
            <div className="demo-app-main">
                <FullCalendar
                    plugins={[dayGridPlugin as any, interactionPlugin as any]}
                    initialView="dayGridMonth"
                    selectable={true}
                    editable={true}
                    initialEvents={INITIAL_EVENTS}
                    locale="kr"
                    eventsSet={handleEvents}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                />
            </div>
        </div>
    );
}

