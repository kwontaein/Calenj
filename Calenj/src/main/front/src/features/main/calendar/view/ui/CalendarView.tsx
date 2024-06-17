import React, {useEffect, useState} from "react";
import FullCalendar, {DateSelectArg, EventApi, EventInput} from "@fullcalendar/react";
import {useCalendar} from "../model/useCalendar";
import {GridCalendar_Container, StyledFullCalendar} from "./CalendarStyled";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from '@fullcalendar/rrule'

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import {AddDateEvent} from "./AddDateEvent";
import {ExternalEvents} from "../../stamp/ExternalEvents";

// 이벤트 인터페이스 정의
interface Event {
    id: number;
    title: string;
    color: string;
    custom?: string;
}

interface AppState {
    weekendsVisible: boolean;
    externalEvents: Event[];
    calendarEvents: Event[];
}

export const CalendarView: React.FC = () => {
    const {handleEvents, handleEventClick} = useCalendar();
    const [addEvent, setAddEvent] = useState<boolean>(false);
    const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
    const onClose = () => {
        setAddEvent(false)
    }
    const [state, setState] = useState<AppState>({
        weekendsVisible: true,
        externalEvents: [
            {id: 34432, title: "Art 1", color: "#0097a7", custom: "fdsfdsfds"},
            {id: 323232, title: "Art 2", color: "#f44336"},
            {id: 1111, title: "Art 3", color: "#f57f17"},
            {id: 432432, title: "Art 4", color: "#90a4ae"}
        ],
        calendarEvents: []
    });

    const onEventAdd = () => {
        const newEvent: Event = {
            id: Date.now(), // 고유 ID 생성을 위해 현재 시간의 타임스탬프 사용
            title: "New Event",
            color: "#333333",
            custom: "custom details"
        };

        setState(prevState => ({
            ...prevState,
            externalEvents: [...prevState.externalEvents, newEvent]
        }));
    };
    
    return (
        <>
            <ExternalEvents events={state.externalEvents} onEventAdd={onEventAdd}/>
            <GridCalendar_Container>
                {addEvent &&
                    <AddDateEvent onClose={onClose} selectInfo={selectInfo as DateSelectArg}/>
                }
                <StyledFullCalendar

                    plugins={[rrulePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    selectable={!addEvent}
                    editable={true}
                    locale="ko"
                    headerToolbar={{
                        left: "prevYear,prev,next,nextYear today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    nowIndicator={true}
                    height="99.5%"
                    eventsSet={handleEvents}
                    select={(selectInfo: DateSelectArg) => {
                        setAddEvent(true)
                        setSelectInfo(selectInfo);
                    }}
                    eventClick={handleEventClick}

                />
            </GridCalendar_Container>
        </>

    );
};
