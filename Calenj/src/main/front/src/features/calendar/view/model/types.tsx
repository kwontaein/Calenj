import {EventContentArg} from "@fullcalendar/react";
import {RepeatState} from "../../../../entities/calendar";

export interface CalendarEventProps{
    eventInfo: EventContentArg
}



// 이벤트 인터페이스 정의
export interface CustomEvent {
    id: number;
    title: string;
    color: string;
    custom?: string;
}

export interface AppState {
    weekendsVisible: boolean;
    externalEvents: CustomEvent[];
    calendarEvents: CustomEvent[];
}

export interface EventViewProps{
    top:number|undefined,
    left:number|undefined
    width:number,
    todoList:string[],
    color:string,
}

export interface ReturnExtendedProps {
    tagKeys: string[],
    formState: string,
    content: string,
    todoList: string[],
    repeatState: RepeatState,
}
