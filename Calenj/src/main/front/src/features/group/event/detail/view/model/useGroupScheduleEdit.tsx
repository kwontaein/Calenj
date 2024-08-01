import {GroupSchedule} from "../../../../../../entities/reactQuery";
import {useReducer} from "react";
import {groupEventReducer, groupEventSate} from "../../../../../../entities/group";
import {GroupEventAction} from "../../../../../../entities/group/model/groupEventReducer";

interface ReturnScheduleEdit{
    editMode: boolean,
    setEditMode: React.DispatchWithoutAction,
    groupSchedule : groupEventSate,
    dispatchGroupSchedule:  React.Dispatch<GroupEventAction>,
}
export const useGroupScheduleEdit = (scheduleDetail: GroupSchedule):ReturnScheduleEdit=>{
    const [editMode,setEditMode]  = useReducer((prev)=>!prev,false);
    const {startDate, scheduleTitle, privacy, maxPeople} = scheduleDetail
    const [groupSchedule, dispatchGroupSchedule] = useReducer(groupEventReducer, {
        startDate:new Date(startDate),
        scheduleTitle,
        privacy,
        isLimit: maxPeople!==0,
        maxPeople,
    });

    return {editMode,setEditMode, groupSchedule,dispatchGroupSchedule}
}