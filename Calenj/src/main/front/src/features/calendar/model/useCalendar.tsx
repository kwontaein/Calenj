import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/react";
import {createEventId} from "../utils/event-utils";
import {ReturnCalendar, ReturnExtendedProps} from "./types";
import {Dictionary} from "@fullcalendar/core";


export const useCalendar = ():ReturnCalendar =>{
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);


    const handleEvents = useCallback(
        (events: EventApi[]) => {

            events.map((event)=>{
                const repeatData:Dictionary =event.extendedProps
                if(repeatData.repeatState.repeat){

                }
            })
            setCurrentEvents(events)
        }
        ,[]);


    const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
        let title = prompt("이벤트 추가")?.trim();

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
        console.log(clickInfo.event.extendedProps)
        if (
            window.confirm(`${clickInfo.event.title}`)
        ) {
            clickInfo.event.remove();
        }
    }, []);


    return {handleEvents,handleEventClick}
}