import {groupEventData} from "./date";
import {AHMFormat} from "../../../../../shared/lib";
import {MiniText} from "../../../../../shared/ui/SharedStyled";
import {GroupEventListTitle, GroupEventListView_Li, MaxPeopleText_Container} from "./GroupEventListStyled";
import {useEffect, useState} from "react";
import {EventStateMap} from "../../../../../entities/redux/model/module/StompMiddleware";
import {useDispatch, useSelector} from "react-redux";
import {RootState, updateScheduleState} from "../../../../../entities/redux";
import {ScheduleDetail} from "../../detail/view";

interface ScheduleInfo{
    scheduleId:string,
    scheduleTitle:string,
    mapModal:boolean,
}

export const GroupEventList:React.FC =()=>{
    const groupEvents =groupEventData;
    const groupId = useSelector((state:RootState)=> state.subNavigation.group_subNavState.param)
    const disptach = useDispatch()
    const {scheduleId} = useSelector((state:RootState)=>state.groupSchedule)

    useEffect(() => {
        const eventState:ScheduleInfo = EventStateMap.get(groupId)
        if(!eventState){
            EventStateMap.set(groupId, {scheduleId: '', scheduleTitle:'', mapModal:true})
            disptach(updateScheduleState({scheduleId:'',scheduleTitle:'', mapModal:true}))
        }else{
            disptach(updateScheduleState(eventState))
        }
    }, []);

    const eventDetailHandler = (scheduleId:string, scheduleTitle:string)=>{
        const {mapModal} = EventStateMap.get(groupId);
        EventStateMap.set(groupId, {scheduleId,scheduleTitle,mapModal})
        disptach(updateScheduleState({scheduleId, scheduleTitle,mapModal}))

    }

    return(
        <>
            {scheduleId!=="" ?
            <ScheduleDetail/>
            :
            <>
                {groupEvents.map((groupEvent)=>(
                    <GroupEventListView_Li key={groupEvent.groupScheduleId} onClick={()=>eventDetailHandler(groupEvent.groupScheduleId, groupEvent.groupScheduleTitle)}>
                        <GroupEventListTitle>{groupEvent.groupScheduleTitle}</GroupEventListTitle>
                        <MaxPeopleText_Container>{groupEvent.maxPeople>0 ?`인원 제한 : ${groupEvent.maxPeople}명`:"인원제한 : 없음"}</MaxPeopleText_Container>
                        <MiniText>{`일정 생성일 : ${AHMFormat(groupEvent.groupScheduleCreate)}`}</MiniText>
                    </GroupEventListView_Li>
                ))}
            </>
            }
        </>
    )
}