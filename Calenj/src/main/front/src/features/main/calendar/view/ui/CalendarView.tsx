import React, {useEffect, useState} from "react";
import FullCalendar, {DateSelectArg, EventApi, EventInput} from "@fullcalendar/react";
import { useCalendar } from "../model/useCalendar";
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


export const CalendarView: React.FC = () => {
    const { handleEvents, handleEventClick } = useCalendar();
    const [addEvent,setAddEvent] = useState<boolean>(false);
    const [selectInfo, setSelectInfo] = useState<DateSelectArg|null>(null);
    const onClose = ()=>{
        setAddEvent(false)
    }

    return (
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
                    select={(selectInfo: DateSelectArg)=> {
                        setAddEvent(true)
                        setSelectInfo(selectInfo);
                    }}
                    eventClick={handleEventClick}

                />
            </GridCalendar_Container>
    );
};
