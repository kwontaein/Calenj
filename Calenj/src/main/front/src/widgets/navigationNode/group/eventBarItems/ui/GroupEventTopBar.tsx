import {useDispatch, useSelector} from 'react-redux'
import React from "react";

import styled from "styled-components";
import {RootState} from "../../../../../entities/redux";
import {FullScreen_div, TextColor} from "../../../../../shared/ui/SharedStyled";
import {updateGroupShowMemberList} from "../../../../../entities/redux/model/slice/SubNavigationSlice";

interface GroupUserListProps {
    $isClick: boolean,
}

const EventTopBarContent = styled.div<GroupUserListProps>`
    width: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${props => props.$isClick ? TextColor : `${TextColor}77`};

    &:hover {
        color: ${TextColor};
    }
`

const EventTopBarSubContent = styled.div`
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${TextColor}77;

    &:hover {
        color: ${TextColor};
    }
`
export const GroupEventTopBar : React.FC = () =>{
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
