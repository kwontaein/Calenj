import {AHMFormat} from "../../../../../shared/lib";
import {MiniText} from "../../../../../shared/ui/SharedStyled";
import {GroupEventListTitle, GroupEventListView_Li, MaxPeopleText_Container} from "./GroupEventListStyled";
import {useEffect, useState} from "react";
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
    const groupScheduleList =useFetchGroupScheduleList(groupId)
    const disptach = useDispatch()
    const {scheduleId} = useSelector((state:RootState)=>state.groupSchedule)
    const [scheduleDetail,setScheduleDetail] = useState<GroupSchedule>();

    useEffect(() => {
        const eventState:ScheduleInfo = EventStateMap.get(groupId)
        if(!eventState){
            EventStateMap.set(groupId, {scheduleId: '', scheduleTitle:'', mapModal:true})
            disptach(updateScheduleState({scheduleId:'',scheduleTitle:'', mapModal:true}))
        }else{
            disptach(updateScheduleState(eventState))
        }
    }, []);

    const eventDetailHandler = (groupEvent:GroupSchedule)=>{
        const {groupId, groupScheduleTitle,scheduleId} = groupEvent;
        const {mapModal} = EventStateMap.get(groupEvent.groupId);
        EventStateMap.set(groupId, {scheduleId,scheduleTitle:groupScheduleTitle,mapModal})
        disptach(updateScheduleState({scheduleId,scheduleTitle:groupScheduleTitle,mapModal}))
        setScheduleDetail(groupEvent)
    }

    return(
        <>
            {scheduleDetail ?
            <ScheduleDetail scheduleDetail={scheduleDetail}/>
            :
            <>
                {groupScheduleList.data &&
                    groupScheduleList.data.map((groupEvent:GroupSchedule)=>(
                    <GroupEventListView_Li key={groupEvent.scheduleId} onClick={()=>eventDetailHandler(groupEvent)}>
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