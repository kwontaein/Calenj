import React, {useEffect, useRef, useState} from "react";
import FullCalendar, {DateSelectArg, EventApi, EventInput} from "@fullcalendar/react";
import { useCalendar } from "../model/useCalendar";
import {GridCalendar_Container, StyledFullCalendar} from "./CalendarStyled";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {DateClickArg} from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from '@fullcalendar/rrule'

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import {AddDateEvent} from "../../create/";
import {useFetchDateEventTag} from "../../../../../entities/reactQuery";
import {CalendarEventView} from "./CalendarEventView";
import {RootState} from "../../../../../entities/redux";
import {useDispatch, useSelector} from "react-redux";
import { setCalendarCompound} from "../../../../../entities/redux/model/slice/CalendarControllerSlice";
import {CalendarApi} from "@fullcalendar/core";
import {useCalendarController} from "../model/useCalendarController";


export const CalendarView: React.FC = () => {
    const {data} = useFetchDateEventTag();
    const { currentEvents ,handleEvents, handleEventClick } = useCalendar(data);
    const [addEvent,setAddEvent] = useState<boolean>(false);
    const [selectInfo,setSelectInfo] = useState<DateSelectArg|null>(null);
    const {calendarRef,handleNavLinkDayClick} =useCalendarController();
    const onClose = ()=>{
        setAddEvent(false)
    }

    return (
        <>
        {data &&
            <GridCalendar_Container>
                {addEvent &&
                    <AddDateEvent onClose={onClose} selectInfo={ selectInfo as DateSelectArg}/>
                }
                <StyledFullCalendar
                    ref={calendarRef}
                    plugins={[rrulePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    selectable={!addEvent}
                    editable={true}
                    locale="ko"
                    headerToolbar={{
                        left: "title",
                        right: "",
                    }}
                    nowIndicator={true}
                    height="99.5%"
                    navLinks={true} // navLinks 옵션은 필요에 따라 추가 설정
                    navLinkDayClick={handleNavLinkDayClick}
                    events={currentEvents}
                    dayMaxEventRows={2}
                    eventsSet={handleEvents}
                    select={(selectInfo: DateSelectArg)=> {
                        setAddEvent(true)
                        setSelectInfo(selectInfo)
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
