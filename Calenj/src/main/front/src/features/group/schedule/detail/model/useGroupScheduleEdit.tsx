import {GroupSchedule} from "../../../../../entities/reactQuery";
import {ReturnScheduleEdit} from "./types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {useReducer} from "react";
import {groupEventReducer} from "../../../../../entities/group";
import {EventStateMap} from "../../../../../entities/redux/model/module/StompMiddleware";
import {updateMapModal} from "../../../../../entities/redux/model/slice/GroupScheduleSlice";


export const useGroupScheduleEdit = (scheduleDetail: GroupSchedule):ReturnScheduleEdit=>{
    const groupId = useSelector((state: RootState) => state.subNavigation.group_subNavState.param)
    const {scheduleId, mapModal} = useSelector((state: RootState) => state.groupSchedule)

    const [editMode,setEditMode]  = useReducer((prev)=>!prev,false);
    const {startDate, scheduleTitle, privacy, maxPeople} = scheduleDetail
    const [groupSchedule, dispatchGroupSchedule] = useReducer(groupEventReducer, {
        startDate:new Date(startDate),
        scheduleTitle,
        privacy,
        isLimit: maxPeople!==0,
        maxPeople,
    });

    const dispatch = useDispatch()
    const mapHandler = () => {
        EventStateMap.set(groupId, {scheduleId, scheduleTitle, mapModal: !mapModal})
        dispatch(updateMapModal())
    }


    return {editMode,setEditMode, groupSchedule,dispatchGroupSchedule, mapHandler}
}