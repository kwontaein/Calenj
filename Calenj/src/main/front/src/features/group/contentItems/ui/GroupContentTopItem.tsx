import { useSelector} from 'react-redux'
import {EventTopBarContent, EventTopBarSubContent} from "./ContentCompositionStyle";
import React from "react";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";
import {RootState} from "../../../../entities/redux";

interface ContentCompositionProps{
    showUserListMutate : ()=>void,
    showUserList :boolean,
}

export const GroupContentTopItem : React.FC<ContentCompositionProps> = ({showUserListMutate,showUserList}) =>{
    const clickState = useSelector((state:RootState) => state.group_subNavState.clickState)

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
            <EventTopBarContent $isClick={showUserList}
                                onClick={showUserListMutate}>
                <i className="fi fi-ss-users"></i>
            </EventTopBarContent>
        </FullScreen_div>
    )
}
