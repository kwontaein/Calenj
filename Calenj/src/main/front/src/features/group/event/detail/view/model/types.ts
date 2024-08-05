import {DragEvent} from "react";
import {groupEventSate} from "../../../../../../entities/group";
import {GroupEventAction} from "../../../../../../entities/group/model/groupEventReducer";

export interface ReturnListDrag{
    dragStart : (e: DragEvent<HTMLDivElement>, position: number)=>void,
    dragEnter : (e: DragEvent<HTMLDivElement>, position: number) => void,
    drop: ()=>void,
    dragMousePosition : (e: DragEvent<HTMLDivElement>) => void,
    mousePosition: {x: number, y: number} | null,
    ItemWidth:number|null,
    dragIndex: React.MutableRefObject<number | null>,
    deleteRef: React.MutableRefObject<number | null>,
    addSubSchedule: ()=>void,
    deleteSubSchedule: ()=>void,
    scheduleTime:Date[]
}

export interface ReturnScheduleEdit{
    editMode: boolean,
    setEditMode: React.DispatchWithoutAction,
    groupSchedule : groupEventSate,
    dispatchGroupSchedule:  React.Dispatch<GroupEventAction>,
    mapHandler: ()=>void,
}