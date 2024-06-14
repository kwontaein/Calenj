import React, {useCallback, useEffect, useState} from "react";
import {EventApi, EventClickArg} from "@fullcalendar/react";
import {DateEvent, RepeatOption, ReturnCalendar, ReturnExtendedProps} from "./types";
import {RRule, Options, Weekday, ByWeekday} from 'rrule';
import axios, {AxiosResponse} from "axios";
import chroma from "chroma-js";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {RepeatState} from "../../../../../entities/calendar";
import {EventTagDTO, UserDateEvent} from "../../../../../entities/reactQuery";
import {useFetchUserDateEvent} from "../../../../../entities/reactQuery/model/queryModel";


export const useCalendar = (data: EventTagDTO[] | null | undefined): ReturnCalendar => {
    const [currentEvents, setCurrentEvents] = useState<DateEvent[]>([]);
    type RepeatOption = '일' | '주' | '달' | '년';
    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)
    const userEventDateState = useFetchUserDateEvent()

    const weekArr = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA]

    const freqHash = {
        일: RRule.DAILY,
        주: RRule.WEEKLY,
        달: RRule.MONTHLY,
        년: RRule.YEARLY
    };


    const useRruleSetting = (repeatState:RepeatState, start:Date) :Partial<Options> =>{
        const {repeatMode,repeatNum, repeatCount, repeatWeek, repeatEnd, startTime, endTime, repeatDeadLine, repeatOption} =repeatState;
        const options: Partial<Options> = {
            dtstart: start,
        };

        if (repeatMode === "cycle") {
            options.freq = freqHash[repeatOption as RepeatOption];
            options.interval = repeatNum;
        } else if (repeatMode === "week") {
            options.freq = RRule.WEEKLY;
            const byWeekData: string | number | Weekday | ByWeekday[] | null | undefined = [];
            repeatWeek.forEach((week, index) => {
                if (week) {
                    byWeekData.push(weekArr[index])
                }
            })
            options.byweekday = byWeekData;
        }
        if (repeatDeadLine === "count") {
            options.count = repeatCount;
        } else if (repeatDeadLine === "date") {
            options.until = repeatEnd;
        }
        options.byhour = startTime.getHours();
        options.byminute = startTime.getMinutes();
        return options
    }
    const setUserDateEvent = async () =>{
        if(!userEventDateState.data){
            return []
        }
        console.log(userEventDateState.data)
        const events =userEventDateState.data.map((event):DateEvent=>{
                                const {tagKeys, formState, content, todoList, repeatStateResponse} = event.extendedProps
                                const {repeat, startTime, endTime} =repeatStateResponse;//반복여부
                                const tagKey = tagKeys[0]; //태그 키
                                const color = dynamicEventTag[tagKey].color//지정한 태그의 색

                                const [R, G, B]: number[] = chroma(color).rgb();
                                const Brightness = (0.299 * R) + (0.587 * G) + (0.114 * B);

                                const newEvent:DateEvent={
                                    id: event.id,
                                    title: event.title,
                                    start: event.start,
                                    end: event.end,
                                    textColor: Brightness > 128 ? '#000000' : '#ffffff',
                                    backgroundColor: color,
                                    borderColor: color,
                                    allDay: event.extendedProps.formState === "todo",
                                    extendedProps: {
                                        tagKeys: tagKeys,
                                        formState:formState,
                                        content: content,
                                        todoList: todoList,
                                        repeatStateResponse: repeatStateResponse,
                                    },
                                }
                                if(repeat){
                                    newEvent.duration = {milliseconds: endTime.getTime() - startTime.getTime()};
                                    newEvent.rrule = useRruleSetting(event.extendedProps.repeatStateResponse, event.start)
                                }
                                return newEvent;
                            })
        setCurrentEvents(events);
    }


    useEffect(() => {
        if(data && userEventDateState.data){
            setUserDateEvent()
        }
    }, [data,userEventDateState.data]);



    //이벤트 변경시 api 처리
    const handleEvents = useCallback(
        (events: EventApi[]) => {
            events.map((event) => {

            })
        }
        , []);



    const handleEventClick = useCallback((clickInfo: EventClickArg) => {
        if (
            window.confirm(`${clickInfo.event.title}`)
        ) {
            clickInfo.event.remove();
        }
    }, []);


    return {currentEvents, handleEvents,handleEventClick}
}
