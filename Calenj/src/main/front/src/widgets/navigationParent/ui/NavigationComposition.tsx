import {SubNavigation,ContentsComposition} from "../../navigationNode";
import {FullScreen_div} from '../../../shared/ui/SharedStyled'
import React, {useEffect, useRef, useState} from "react";
import {connect, useDispatch} from 'react-redux'
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps, NavigationProps,
} from '../../../entities/redux/model/slice/NavigatgionSlice'
import {useFetchGroupDetail} from '../../../entities/reactQuery'
import {GroupListView} from "../../../features/group/navItems_list";
import {userDataPush} from "../../../entities/redux";


const NavigationComposition :React.FC<NavigateState & DispatchNavigationProps>=({navigateInfo,updateNavigation})=>{

    //reactQuery로 그룹 디테일정보 fetching
    const groupDetailState = useFetchGroupDetail(navigateInfo.navigate,navigateInfo.navigateParam)
    const dispatch = useDispatch();

    useEffect(() => {
        //사용자 정보 push
        if(groupDetailState.data){
            groupDetailState.data.members.forEach((groupMember)=>{
                dispatch(userDataPush({userId:groupMember.userId, userName: groupMember.nickName}))
            })
        }
    }, [groupDetailState.data]);

    return(
            <FullScreen_div style = {{ display:"flex", flexDirection:"row"}}>
                <GroupListView/>
                <SubNavigation isLoading={groupDetailState.isLoading}/>
                <ContentsComposition isLoading={groupDetailState.isLoading}/>
            </FullScreen_div>
    )

}
export const NavigationParent= connect(mapStateToNavigationProps, mapDispatchToNavigationProps)(NavigationComposition);