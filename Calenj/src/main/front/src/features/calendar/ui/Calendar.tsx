import React, {useState} from "react";
import FullCalendar, {DateSelectArg} from "@fullcalendar/react";

import { INITIAL_EVENTS, createEventId } from "../utils/event-utils";
import { useCalendar } from "../model/useCalendar";
import {GridCalendar_Container, StyledFullCalendar} from "./CalendarStyled";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import {AddDateEvent} from "./AddDateEvent";
import {FullScreen_div} from "../../../shared/ui/SharedStyled";


export const Calendar: React.FC = () => {
    const { handleEvents, handleDateSelect, handleEventClick } = useCalendar();
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
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    selectable={!addEvent}
                    editable={true}
                    initialEvents={INITIAL_EVENTS}
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
