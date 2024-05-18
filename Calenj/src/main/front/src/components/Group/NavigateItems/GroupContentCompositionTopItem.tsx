import {
    SubNavigateState,
    mapStateToSubNavigationProps,
} from "../../../store/slice/SubNavigationSlice";
import {connect} from 'react-redux'
import {EventTopBarContent, EventTopBarSubContent, EventTopBar_Container} from "../../../style/Navigation/ContentCompositionStyle";
import React from "react";
import {FullScreen_div} from "../../../style/FormStyle";

interface ContentCompositionProps{
    showUserListMutate : ()=>void,
    showUserList :boolean,
}

const GroupContentCompositionTopItem : React.FC<SubNavigateState & ContentCompositionProps> = ({showUserListMutate,showUserList,subNavigateInfo}) =>{
    return(
        <FullScreen_div style={{display:'flex', flexDirection:'row', justifyContent:'right'}}>
            {subNavigateInfo.clickState==="공지"&&
                <EventTopBarSubContent>
                    <i className="fi fi-ss-megaphone"></i>
                </EventTopBarSubContent>}
            {subNavigateInfo.clickState==="투표"&&
                <EventTopBarSubContent>
                    <i className="fi fi-ss-vote-yea"></i>
                </EventTopBarSubContent>}
            {subNavigateInfo.clickState==="그룹일정"&&
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
export default connect(mapStateToSubNavigationProps,null) (GroupContentCompositionTopItem);