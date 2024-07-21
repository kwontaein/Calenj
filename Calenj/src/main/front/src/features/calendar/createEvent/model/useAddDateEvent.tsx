import {useEffect, useMemo, useReducer, useState} from "react";
import {beforeCheckEvent} from "../utils/beforeCheckEvent";
import chroma from "chroma-js";
import {DateEvent, ReturnTodo, TodoItem} from "./types";
import {v4 as uuidv4} from "uuid";
import {addRruleOptions} from "../utils/addRruleOptions";
import {postDateEventApi} from "../api/postDateEventApi";

import {useTodoList} from "./useTodoList";
import {DateSelectArg} from "@fullcalendar/react";
import {useSelector} from "react-redux";
import {UserDateEvent} from "../../../../entities/reactQuery";
import {
    DateEventAction,
    DateEventReducer,
    DateEventState, initialEventDateState, initialRepeatState,
    RepeatAction, RepeatReducer,
    RepeatState
} from "../../../../entities/calendar";
import {useConfirm} from "../../../../shared/model";
import {useFetchUserDateEvent} from "../../../../entities/reactQuery/model/queryModel";

interface ReturnAddEvent{
    repeatState: RepeatState,
    repeatDispatch: React.Dispatch<RepeatAction>,
    eventState: DateEventState,
    eventDispatch: React.Dispatch<DateEventAction>
    todoState:ReturnTodo,
    closeModal:()=>void,
    postEvent:()=>void,
}

export const useAddDateEvent = (onClose:()=>void, selectInfo:DateSelectArg):ReturnAddEvent =>{
    const userEventDateState = useFetchUserDateEvent()

    function adjustDate(dateStr: string, allDay: boolean): Date {
        const date = new Date(dateStr);
        if (allDay) {
            date.setHours(date.getHours() - 9);
        }
        return date;
    }



    const initStartDate = adjustDate(selectInfo.startStr ,selectInfo.allDay);
    const initEndDate = adjustDate(selectInfo.endStr, selectInfo.allDay);



    const [eventState, eventDispatch] = useReducer(DateEventReducer, {
        ...initialEventDateState,
        startDate: initStartDate,
        endDate: initEndDate,
        formState: selectInfo?.allDay ? 'todo' : 'promise'
    });
    const [repeatState, repeatDispatch] = useReducer(RepeatReducer, initialRepeatState);
    const {formState, startDate, endDate, title, content, backgroundColor, tagKeys} = eventState
    const todoState = useTodoList();

    const closeModal = () => {
        if (title === "" && content === "") {
            onClose()
        } else {
            useConfirm("내용은 저장되지 않습니다. 정말로 취소하시겠습니까?", onClose, () => {
            })
        }
    }

    useEffect(() => {
        if (startDate > endDate) {
            eventDispatch({type: 'SET_END_DATE', payload: new Date(+startDate + 1800000)})
        }
    }, [startDate,endDate]);

    const postEvent = () => {
        const {repeat, startTime, endTime, repeatEnd, repeatDeadline} = repeatState

        if(!beforeCheckEvent(repeatState, eventState, todoState.todoList)){
            return
        }
        const [R, G, B]: number[] = chroma(backgroundColor).rgb();
        const Brightness = (0.299 * R) + (0.587 * G) + (0.114 * B);

        const todo = todoState.todoList.map((item: TodoItem) => item.content);
        const UUid = uuidv4();

        const event: DateEvent = {
            id: UUid,
            title: title,
            start: (formState==="schedule" && !repeat) ? new Date(startDate.setHours(startTime.getHours(),startTime.getMinutes())) : startDate,
            end: (formState==="schedule" && !repeat) ? new Date(startDate.setHours(endTime.getHours(),endTime.getMinutes())) :endDate,
            textColor: Brightness > 128 ? '#ffffff' : '#000000',
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            allDay: formState === "todo",
            extendedProps: {
                tagKeys: tagKeys,
                formState: formState,
                content: content,
                todoList: todo,
                repeatState: repeatState,
            },
        }
        if (repeat) {
            event.duration = {milliseconds: endTime.getTime() - startTime.getTime()};
            event.rrule = addRruleOptions(repeatState, new Date(event.start.toString()))
            if(repeatDeadline ==="date"){
                event.rrule.until = new Date(repeatEnd.setDate(repeatEnd.getDate()+1));
            }
        }

        const saveEvent: UserDateEvent = {
            id: UUid,
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.allDay,
            extendedProps: event.extendedProps,
        }
        postDateEventApi(saveEvent).then(()=>{
            userEventDateState.refetch()
        })
        onClose()
    }

    return {repeatState, repeatDispatch, eventState, eventDispatch, todoState, closeModal, postEvent}
}