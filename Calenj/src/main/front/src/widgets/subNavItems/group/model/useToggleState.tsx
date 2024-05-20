import {useEffect, useState} from "react";
import {toggleCurrentMap} from "../../../../store/module/StompMiddleware";

export const useToggleState= (groupId:string) :[toggleState:boolean|undefined, toggleHandler:()=>void]=>{
    const [toggleState,setToggleState] = useState<boolean>()


    useEffect(() => { //초기 값 세팅 - 토글 정보를 가져옴(투표/공지)
        if(!toggleCurrentMap.get(groupId)){
            toggleCurrentMap.set(groupId,{toggleState: true, clickState: ""})
        }
        setToggleState(toggleCurrentMap.get(groupId).toggleState);
    }, [groupId]);

    const toggleHandler : ()=>void = () =>{
        if(groupId){
            const subNavgationState =toggleCurrentMap.get(groupId);
            subNavgationState.toggleState = !(subNavgationState.toggleState);
            setToggleState(subNavgationState.toggleState);
            toggleCurrentMap.set(groupId,subNavgationState);
        }
    }


    return [toggleState,toggleHandler]
}