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
import {AddDateEvent} from "../../create/";
import {useFetchDateEventTag} from "../../../../../entities/reactQuery";
import {CalendarEventView} from "./CalendarEventView";


export const CalendarView: React.FC = () => {
    const {data} = useFetchDateEventTag();
    const { currentEvents ,handleEvents, handleEventClick } = useCalendar(data);
    const [addEvent,setAddEvent] = useState<boolean>(false);
    const [selectInfo, setSelectInfo] = useState<DateSelectArg|null>(null);
    const onClose = ()=>{
        setAddEvent(false)
    }

    return (
        <>
        {data &&
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
                    navLinks={true}
                    events={currentEvents}
                    dayMaxEventRows={2}
                    eventsSet={handleEvents}
                    select={(selectInfo: DateSelectArg)=> {
                        setAddEvent(true)
                        setSelectInfo(selectInfo);
                    }}
                    eventChange={(e) => console.log(e)} //이벤트 변경 시 이벤트에 대한 상태
                    eventClick={handleEventClick}
                    eventContent={(eventInfo) => (
                        <CalendarEventView eventInfo={eventInfo}/>
                    )}
                />
            </GridCalendar_Container>
        }
        </>
    );
};
