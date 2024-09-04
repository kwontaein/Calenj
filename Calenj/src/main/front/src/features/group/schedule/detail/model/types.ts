
import {DragEvent} from "react";
import {groupEventSate, GroupSubScheduleAction} from "../../../../../entities/group";
import {SubSchedule} from "../../../../../entities/reactQuery";
import {GroupEventAction} from "../../../../../entities/group/model/groupEventReducer";


export interface ReturnSubSchedule{
    subScheduleEdit: SubSchedule[],
    dispatchSubSchedule: React.Dispatch<GroupSubScheduleAction>
    dragStart : (e: DragEvent<HTMLDivElement>, position: number)=>void,
    dragEnter : (e: DragEvent<HTMLDivElement>, position: number) => void,
    drop: ()=>void,
    dragIndex: React.MutableRefObject<number | null>,
    deleteRef: React.MutableRefObject<number | null>,
    addSubSchedule: ()=>void,
    deleteSubSchedule: ()=>void,
    saveGroupSchedule: ()=>void,
    joinSubSchedule:(subScheduleId:string, index:number)=>void,
    scheduleTime:Date[]
}

export interface ReturnScheduleEdit{
    editMode: boolean,
    setEditMode: React.DispatchWithoutAction,
    groupSchedule : groupEventSate,
    dispatchGroupSchedule:  React.Dispatch<GroupEventAction>,
    mapHandler: ()=>void,
}


export  interface NaverSearchResponse {
    astBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: LocalItem[];
}
export interface LocalItem {
    title:string,
    link:string,
    category:string,
    description:string,
    telephone:string,
    address:string,
    roadAddress:string,
    mapx:string,
    mapy:string
}

