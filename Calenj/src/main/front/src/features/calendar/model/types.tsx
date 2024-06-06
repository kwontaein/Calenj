import {DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/react";
import React from "react";

export interface ReturnCalendar {
    handleEvents: (events: EventApi[]) => void,
    // handleDateSelect: (selectInfo: DateSelectArg) => void,
    handleEventClick:(clickInfo: EventClickArg) => void,
}

export interface TodoItem {
    id: number,
    content: string,
}
export interface ReturnTodo{
    todoList : TodoItem[],
    setContent:  React.Dispatch<React.SetStateAction<string>>,
    addList: ()=>void,
    removeItem : (key:number) => void,
    contentRef :React.RefObject<HTMLInputElement>
}
