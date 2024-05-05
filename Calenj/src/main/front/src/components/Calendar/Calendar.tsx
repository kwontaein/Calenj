import {useCallback, useState} from "react";
import FullCalendar, {
    DateSelectArg,
    EventApi,
    EventClickArg
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import {INITIAL_EVENTS, createEventId} from "./event-utils";

function Calendar() {
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const handleEvents = useCallback(
        (events: EventApi[]) => setCurrentEvents(events),
        []
    );
    const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
        let title = prompt("한국어로,,, 해줘")?.trim();
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();
        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            });
        }
    }, []);
    const handleEventClick = useCallback((clickInfo: EventClickArg) => {
        if (
            window.confirm(`${clickInfo.event.title}`)
        ) {
            clickInfo.event.remove();
        }
    }, []);
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

export default Calendar;
