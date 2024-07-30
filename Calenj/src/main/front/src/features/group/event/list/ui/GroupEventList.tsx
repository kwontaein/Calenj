import {AHMFormat} from "../../../../../shared/lib";
import {MiniText} from "../../../../../shared/ui/SharedStyled";
import {GroupEventListTitle, GroupEventListView_Li, MaxPeopleText_Container} from "./GroupEventListStyled";
import {useCallback, useEffect, useState} from "react";
import {EventStateMap} from "../../../../../entities/redux/model/module/StompMiddleware";
import {useDispatch, useSelector} from "react-redux";
import {RootState, updateScheduleState} from "../../../../../entities/redux";
import {ScheduleDetail} from "../../detail/view";
import {GroupSchedule, useFetchGroupScheduleList} from "../../../../../entities/reactQuery";

interface ScheduleInfo{
    scheduleId:string,
    scheduleTitle:string,
    mapModal:boolean,
}

export const GroupEventList:React.FC =()=>{
    const groupId = useSelector((state:RootState)=> state.subNavigation.group_subNavState.param)
    const disptach = useDispatch()
    const {scheduleId} = useSelector((state:RootState)=>state.groupSchedule)
    const [scheduleDetail,setScheduleDetail] = useState<GroupSchedule|null>(null);
    const groupScheduleList =useFetchGroupScheduleList(groupId)

    useEffect(() => {
        if(!groupScheduleList.data) return
        const eventState:ScheduleInfo = EventStateMap.get(groupId)
        if(!eventState){
            EventStateMap.set(groupId, {scheduleId: '', scheduleTitle:'', mapModal:true})
            disptach(updateScheduleState({scheduleId:'',scheduleTitle:'', mapModal:true}))
        }else{
            const scheduleDetail = groupScheduleList.data.filter((schedule)=> schedule.scheduleId === scheduleId)
            console.log(scheduleDetail)
            disptach(updateScheduleState(eventState))
        }
    }, [groupScheduleList.data,scheduleId]);

    const eventDetailHandler = (scheduleId:string, scheduleTitle:string)=>{
        const {mapModal} = EventStateMap.get(groupId);
        disptach(updateScheduleState({scheduleId,scheduleTitle, mapModal}))
        EventStateMap.set(groupId, {scheduleId,scheduleTitle,mapModal})
    }

    return(
        <>
            {scheduleDetail ?
            <ScheduleDetail scheduleDetail={scheduleDetail}/>
            :
            <>
                {groupScheduleList.data &&
                    groupScheduleList.data.map((groupEvent:GroupSchedule)=>(
                    <GroupEventListView_Li key={groupEvent.scheduleId} onClick={()=>eventDetailHandler(groupEvent.scheduleId, groupEvent.groupScheduleTitle)}>
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