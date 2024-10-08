import {SubNavigation,ContentsComposition} from "../../navigationNode/nodeComposition";
import {FullScreen_div} from '../../../shared/ui/SharedStyled'
import React, {useEffect, useRef, useState} from "react";
import {connect, useDispatch, useSelector} from 'react-redux'
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps,
} from '../../../entities/redux/model/slice/NavigatgionSlice'
import {useFetchGroupDetail, useFetchUserInfo} from '../../../entities/reactQuery'
import {RootState, saveUserName} from "../../../entities/redux";
import {SideAlarmView} from "./SideAlarmView";


const NavigationComposition :React.FC<NavigateState & DispatchNavigationProps>=({navigateInfo,updateNavigation})=>{

    const userId = localStorage.getItem('userId')||'';
    const userInfo = useFetchUserInfo(userId); //사용자정보 저장

    //reactQuery로 그룹 디테일정보 fetching
    const groupDetailState = useFetchGroupDetail(navigateInfo.navigate,navigateInfo.navigateParam)
    const {receiveMessage} = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독

    const dispatch = useDispatch();

    useEffect(() => {
        let {message, state} = receiveMessage

        if(state !=="SEND") return
        let {messageType} =message[0]
        if(messageType ==="join"){
            groupDetailState.refetch()
        }
    }, [receiveMessage.receivedUUID]);

    
    useEffect(() => {
        //사용자 정보 push
        if(groupDetailState.data){
            groupDetailState.data.members.forEach((groupMember)=>{
                dispatch(saveUserName({userId:groupMember.userId, userName: groupMember.nickName}))
            })
        }
    }, [groupDetailState.data]);

    return(
            <FullScreen_div style = {{ display:"flex", flexDirection:"row"}}>
                <SideAlarmView/>
                <SubNavigation isLoading={groupDetailState.isLoading}/>
                <ContentsComposition isLoading={groupDetailState.isLoading}/>
            </FullScreen_div>
    )

}
export const NavigationParent= connect(mapStateToNavigationProps, mapDispatchToNavigationProps)(NavigationComposition);