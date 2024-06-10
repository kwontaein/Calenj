import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/react";
import {createEventId} from "../utils/event-utils";
import {ReturnCalendar, ReturnExtendedProps} from "./types";
import {Dictionary} from "@fullcalendar/core";
import {RRule, Options, Weekday} from 'rrule';


export const useCalendar = ():ReturnCalendar =>{
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    type RepeatOption = '일' | '주' | '달' | '년';



    const weekArr = [RRule.SU,RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA]

    const freqHash = {
        일: RRule.DAILY,
        주: RRule.WEEKLY,
        달: RRule.MONTHLY,
        년: RRule.YEARLY
    };

    const handleEvents = useCallback(
        (events: EventApi[]) => {
            const eventData = events.map((event):EventApi[] =>{
                const repeatData:Dictionary =event.extendedProps
                if(repeatData.repeatState.repeat){
                    const {repeatMode, repeatNum, repeatOption, repeatDeadLine, repeatEnd, repeatCount, repeatWeek, startTime, endTime} = repeatData.repeatState

                    const options: Partial<Options> = {
                        dtstart: event.start,
                    };

                    if(repeatMode==="cycle"){
                        options.freq = freqHash[repeatOption as RepeatOption];
                        options.interval = repeatNum;
                    }else if(repeatMode==="week"){
                        options.freq = RRule.WEEKLY;
                        options.byweekday = repeatWeek
                            .map((item:boolean, index:number) => item ? weekArr[index] : null)
                            .filter((item:Weekday|null)=> item !== null);
                    }
                    if(repeatDeadLine ==="count"){
                        options.count = repeatCount;
                    }else if(repeatDeadLine ==="date"){
                        options.until = repeatEnd;
                    }

                    return new RRule(options).all().map(date => (
                        {
                            id : createEventId(),
                            title: event.title,
                            start: new Date(date.setUTCHours(startTime.getUTCHours(), startTime.getUTCMinutes())),
                            end: new Date(date.setUTCHours(endTime.getUTCHours(), endTime.getUTCMinutes())),
                            allDay: false,
                            extendedProps: event.extendedProps
                        } as EventApi
                    ));

                }else{
                    return [event]
                }
            }).flat()

            setCurrentEvents(eventData);
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


    return {currentEvents, handleEvents,handleEventClick}
}