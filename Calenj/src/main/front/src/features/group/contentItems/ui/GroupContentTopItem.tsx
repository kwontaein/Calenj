import {useDispatch, useSelector} from 'react-redux'
import {EventTopBarContent, EventTopBarSubContent} from "./GroupContentItemStyled";
import React from "react";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";
import {RootState} from "../../../../entities/redux";
import {updateGroupShowMemberList} from "../../../../entities/redux/model/slice/SubNavigationSlice";



export const GroupContentTopItem : React.FC = () =>{
    const {clickState, showMemberList} = useSelector((state:RootState) => state.subNavigation.group_subNavState)
    const dispatch = useDispatch()

    return(
        <FullScreen_div style={{display:'flex', flexDirection:'row', justifyContent:'right'}}>
            {clickState==="공지"&&
                <EventTopBarSubContent>
                    <i className="fi fi-ss-megaphone"></i>
                </EventTopBarSubContent>}
            {clickState==="투표"&&
                <EventTopBarSubContent>
                    <i className="fi fi-ss-vote-yea"></i>
                </EventTopBarSubContent>}
            {clickState==="그룹일정"&&
                <EventTopBarSubContent>
                    <i className="fi fi-ss-calendar"></i>
                </EventTopBarSubContent>}
            <EventTopBarContent $isClick={showMemberList}
                                onClick={()=>dispatch(updateGroupShowMemberList())}>
                <i className="fi fi-ss-users"></i>
            </EventTopBarContent>
        </FullScreen_div>
    )
}
