import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/react";
import {createEventId} from "../utils/event-utils";
import {ReturnCalendar, ReturnExtendedProps} from "./types";
import {Dictionary} from "@fullcalendar/core";
import {RRule, Options, Weekday} from 'rrule';
import axios from "axios";


export const useCalendar = (): ReturnCalendar => {
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    type RepeatOption = '일' | '주' | '달' | '년';


    const weekArr = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA]

    const freqHash = {
        일: RRule.DAILY,
        주: RRule.WEEKLY,
        달: RRule.MONTHLY,
        년: RRule.YEARLY
    };

    useEffect(() => {
        axios.get("api/getUserSchedule")
            .then((res) => console.log(res))
    }, []);

    //이벤트 변경시 api 처리
    const handleEvents = useCallback(
        (events: EventApi[]) => {
            events.map((event) => {

            })
        }
        , []);


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
        if (
            window.confirm(`${clickInfo.event.title}`)
        ) {
            clickInfo.event.remove();
        }
    }, []);


    return {currentEvents, handleEvents,handleEventClick}
}