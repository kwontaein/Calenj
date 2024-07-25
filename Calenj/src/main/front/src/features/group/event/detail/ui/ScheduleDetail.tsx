import {useEffect, useReducer, useRef} from "react";
import {groupEventData} from "../../list/ui/date";
import {
    MapIcon_Container,
    MemberMoreView_Text,
    Schedule_Button,
    ScheduleButton_Container,
    ScheduleDetail_Container,
    ScheduleMap_Container,
    ScheduleMember_Container,
    ScheduleMember_Viewer_Container,
    ScheduleMemberItem_Container, ScheduleMemberName_Container,
    ScheduleMemberProfile_Container,
    ScheduleStartDate_Container,
    ScheduleTop_Container
} from "./ScheduleDetailStyled";
import {AHMFormat} from "../../../../../shared/lib";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {updateMapModal} from "../../../../../entities/redux/model/slice/GroupScheduleSlice";
import {EventStateMap} from "../../../../../entities/redux/model/module/StompMiddleware";
import {MiniText} from "../../../../../shared/ui/SharedStyled";
import {useClickOutSideCheck} from "../../../../../shared/model/useClickOutSideCheck";


export const ScheduleDetail:React.FC = () =>{
    const groupScheduleState = groupEventData;
    const {scheduleId, mapModal,scheduleTitle} = useSelector((state:RootState)=>state.groupSchedule)
    const groupId = useSelector((state:RootState)=> state.subNavigation.group_subNavState.param)
    const {userNameRegister} = useSelector((state:RootState)=> state.userNameRegister)
    const [showMember,setShowMember] = useReducer((prev)=>!prev, false)
    const showMemberRef =useClickOutSideCheck(showMember,()=>setShowMember())

    const dispatch = useDispatch()
    const mapHandler = ()=>{
        EventStateMap.set(groupId, {scheduleId,scheduleTitle,mapModal:!mapModal})
        dispatch(updateMapModal())
    }



    return(
        <ScheduleDetail_Container>

            <ScheduleStartDate_Container>
                일정 시작 : {AHMFormat(groupScheduleState[0].groupScheduleCreate)}
            </ScheduleStartDate_Container>
            <ScheduleMember_Container>
                <span>참가인원 : </span>
                <span style={{marginRight:'5px'}}>{groupScheduleState[0].manager.map((userKey,index)=> index<2 ? (index!==0 ? ", ":'') + userNameRegister[userKey].userName :'')}</span>
                {groupScheduleState[0].manager.length>2 &&
                    <div>
                    <MemberMoreView_Text onClick={setShowMember}>외 {groupScheduleState[0].manager.length-2}명</MemberMoreView_Text>
                    {showMember &&
                        <ScheduleMember_Viewer_Container ref={showMemberRef}>
                            {groupScheduleState[0].manager.map((userKey)=>(
                                <ScheduleMemberItem_Container key={userKey}>
                                    <ScheduleMemberProfile_Container $userId={userKey}/>
                                    <ScheduleMemberName_Container>
                                        {userNameRegister[userKey].userName}
                                    </ScheduleMemberName_Container>
                                </ScheduleMemberItem_Container>
                            ))}
                        </ScheduleMember_Viewer_Container>
                    }
                    </div>
                }

            </ScheduleMember_Container>
            <ScheduleButton_Container>
                <MapIcon_Container onClick={mapHandler}>
                    <div style={{fontSize:'13px', marginRight:'5px'}}>지도</div>
                    {mapModal ?
                    <i className="fi fi-br-angle-down" style={{marginTop:'3px'}}></i>:
                    <i className="fi fi-br-angle-right" style={{marginTop:'3px'}}></i>
                    }
                </MapIcon_Container>

            </ScheduleButton_Container>
            {mapModal &&
            <ScheduleMap_Container>
                대충 지도
            </ScheduleMap_Container>
            }
            <ScheduleButton_Container style={{justifyContent:'right'}}>
                <Schedule_Button>
                    세부일정 추가
                </Schedule_Button>
            </ScheduleButton_Container>

        </ScheduleDetail_Container>
    )
}