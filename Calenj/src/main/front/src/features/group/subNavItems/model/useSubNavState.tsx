import {useEffect, useState} from "react";
import {
    updateGroupSubClickState,
    updateGroupSubParam,
    toggleCurrentMap,
} from "../../../../entities/redux";
import {useDispatch} from "react-redux";

export const useSubNavState = (groupId:string)
    :[toggleState:boolean,toggleHandler:()=>void, clickStateHandler:(target:string)=>void] =>{
    const [toggleState,setToggleState] = useState<boolean>(false)
    const dispatch = useDispatch();

    useEffect(() => { //초기 값 세팅 - 토글 정보를 가져옴(투표/공지)
        if(!toggleCurrentMap.get(groupId)){
            toggleCurrentMap.set(groupId,{toggleState: true, clickState: ""})
        }
        const subNavState = (toggleCurrentMap.get(groupId));
        setToggleState(subNavState.toggleState);
        dispatch(updateGroupSubClickState({clickState:subNavState.clickState}));
        dispatch(updateGroupSubParam({param:groupId}));
    }, [groupId]);


    //클릭에따라 설정
    const clickStateHandler = (target: string) => {
        if (groupId) {
            const subNavigationState = toggleCurrentMap.get(groupId);
            if (subNavigationState.clickState === target) {
                subNavigationState.clickState = "";
                dispatch(updateGroupSubClickState({clickState: ""}));
            } else {
                subNavigationState.clickState = target;
                dispatch(updateGroupSubClickState({clickState: target}));
            }
            toggleCurrentMap.set(groupId, subNavigationState)
        }
    }
    const toggleHandler : ()=>void = () =>{
        if(groupId){
            const subNavigationState =toggleCurrentMap.get(groupId);
            subNavigationState.toggleState = !(subNavigationState.toggleState);
            setToggleState(subNavigationState.toggleState);
            toggleCurrentMap.set(groupId,subNavigationState);
        }
    }

    return [toggleState,toggleHandler,clickStateHandler]

}