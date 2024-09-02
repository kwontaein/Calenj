import {AHMFormat} from "../../../../../shared/lib";
import {FullScreen_div, MiniText} from "../../../../../shared/ui/SharedStyled";
import {GroupEventListTitle, GroupEventListView_Li, MaxPeopleText_Container} from "./GroupScheduleListStyled";
import {useCallback, useEffect, useState} from "react";
import {EventStateMap} from "../../../../../entities/redux/model/module/StompMiddleware";
import {useDispatch, useSelector} from "react-redux";
import {RootState, updateScheduleState} from "../../../../../entities/redux";
import {GroupSchedule, useFetchGroupScheduleList} from "../../../../../entities/reactQuery";
import {ScheduleDetail} from "../../detail";

interface ScheduleInfo {
    scheduleId: string,
    scheduleTitle: string,
    mapModal: boolean,
}

export const GroupScheduleList: React.FC = () => {
    const groupId = useSelector((state: RootState) => state.subNavigation.group_subNavState.param)
    const groupScheduleList = useFetchGroupScheduleList(groupId)
    const disptach = useDispatch()
    const {scheduleId} = useSelector((state: RootState) => state.groupSchedule)
    const [scheduleDetail, setScheduleDetail] = useState<GroupSchedule | null>(null);


    useEffect(() => {
        if (!groupScheduleList.data) return
        const eventState: ScheduleInfo = EventStateMap.get(groupId)
        if (!eventState) {
            EventStateMap.set(groupId, {scheduleId: '', scheduleTitle: '', mapModal: true})
            disptach(updateScheduleState({scheduleId: '', scheduleTitle: '', mapModal: true}))
        } else {
            if (scheduleId !== "") {
                const scheduleDetail = groupScheduleList.data.filter((schedule) => schedule.scheduleId === scheduleId)[0]
                setScheduleDetail(scheduleDetail)
            } else {
                disptach(updateScheduleState(eventState))
                setScheduleDetail(null)
            }

        }
    }, [groupScheduleList.data, scheduleId]);

    const eventDetailHandler = (scheduleId: string, scheduleTitle: string) => {
        const {mapModal} = EventStateMap.get(groupId);
        disptach(updateScheduleState({scheduleId, scheduleTitle, mapModal}))
        EventStateMap.set(groupId, {scheduleId, scheduleTitle, mapModal})
    }

    return (
        <FullScreen_div>
            {scheduleDetail ?
                <ScheduleDetail originGroupSchedule={scheduleDetail}/>
                :
                <FullScreen_div>
                    {groupScheduleList.data &&
                        groupScheduleList.data.map((groupEvent: GroupSchedule) => (
                            <GroupEventListView_Li key={groupEvent.scheduleId}
                                                   onClick={() => eventDetailHandler(groupEvent.scheduleId, groupEvent.scheduleTitle)}>
                                <GroupEventListTitle>{groupEvent.scheduleTitle}</GroupEventListTitle>
                                <MaxPeopleText_Container>{groupEvent.maxPeople > 0 ? `인원 제한 : ${groupEvent.maxPeople}명` : "인원제한 : 없음"}</MaxPeopleText_Container>
                                <MiniText>{`일정 생성일 : ${AHMFormat(groupEvent.scheduleCreate)}`}</MiniText>
                            </GroupEventListView_Li>
                        ))}
                </FullScreen_div>
            }
        </FullScreen_div>
    )
}