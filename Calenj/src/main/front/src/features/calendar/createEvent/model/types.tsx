import {DateSelectArg, EventAddArg, EventApi, EventChangeArg, EventClickArg} from "@fullcalendar/react";
import React from "react";
import {Dictionary} from "@fullcalendar/core";
import {Options} from "rrule";
import {RepeatState} from "../../../../entities/calendar";

export interface ReturnCalendar {
    handleEvents: (events: EventChangeArg) => void,
    // handleDateSelect: (selectInfo: DateSelectArg) => void,
    handleEventClick: (clickInfo: EventClickArg) => void,
    handleEventsSet: (events:EventApi[])=>void,
    currentEvents: DateEvent[],
    eventDetail: EventApi | null,
    deleteEvent: EventClickArg | null,
    setEventDetail: React.Dispatch<React.SetStateAction<EventApi | null>>,
    setDeleteEvent: React.Dispatch<React.SetStateAction<EventClickArg | null>>,
    mutateAble: boolean,
    isDrag: boolean,
    dragStart: (clickInfo: EventClickArg) => void,
    dragStop: (clickInfo: EventClickArg) => void,
    handleMouseEnter: () => void,
    handleMouseLeave: () => void,
}

export interface TodoItem {
    id: number,
    content: string,
}

export interface ReturnTodo {
    todoList: TodoItem[],
    setContent: React.Dispatch<React.SetStateAction<string>>,
    addList: () => void,
    removeItem: (key: number) => void,
    contentRef: React.RefObject<HTMLInputElement>
}


export type RepeatOption = '일' | '주' | '달' | '년';

export interface DateEvent {
    id: string,
    title: string,
    start: Date,
    end: Date,
    allDay: boolean
    textColor: string,
    backgroundColor: string,
    borderColor: string,
    duration?: { milliseconds: number },
    rrule?: Partial<Options>,
    extendedProps: {
        tagKeys: string[],
        formState: string,
        content: string,
        todoList: string[],
        repeatState: RepeatState,
        friendList:string[]
    }
    exdate?: string[]
}

