import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {useFetchFriendList, useFetchGroupList, UserDateEvent} from "../../../../entities/reactQuery";
import {useState} from "react";
import {EventApi} from "@fullcalendar/react";
import {DateEvent} from "../../createEvent/model/types";
import {ReturnShareSchedule, ShareList} from "./types";
import {postShareScheduleApi} from "../api/postShareScheduleApi";
import {useConfirm} from "../../../../shared/model";


export const useShareSchedule = (scheduleId: string, copyAble:boolean):ReturnShareSchedule =>{

    const [shareTarget,setShareTarget] = useState<ShareList[]>([])
    const setTargetHandler = (target:string,targetId:string)=>{
        if(shareTarget.some(({chatId})=> chatId===targetId)){
            let newTarget = [...shareTarget].filter(({chatId})=>chatId!==targetId)
            setShareTarget(newTarget)
        }else{
            setShareTarget((prev)=>{
                return [...prev, {target:target, chatId:targetId}]
            })
        }
    }

    const shareSchedule = ()=>{
        if(shareTarget.length===0){
            window.alert('공유할 대상을 선택해주세요.')
            return
        }
        const postSchedule = ()=>{
            postShareScheduleApi(shareTarget,copyAble, scheduleId)

        }
        useConfirm('정말로 해당 일정을 공유하시겠습니까?', postSchedule, ()=>{})
    }

    return {shareTarget, setTargetHandler, shareSchedule}
}