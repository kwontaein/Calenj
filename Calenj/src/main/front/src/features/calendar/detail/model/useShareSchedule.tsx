import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {useFetchFriendList, useFetchGroupList, UserDateEvent} from "../../../../entities/reactQuery";
import {useState} from "react";
import {EventApi} from "@fullcalendar/react";
import {DateEvent} from "../../createEvent/model/types";

interface ReturnShareSchedule{
    shareTarget: ShareList[],
    setTargetHandler:(target:string, targetId: string)=> void
}

interface ShareList {
    target:string,
    chatId:string,
}
export const useShareSchedule = (scheduleId: string):ReturnShareSchedule =>{

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

    const postSchedule = ()=>{
        const post = ()=>{


        }
    }

    return {shareTarget, setTargetHandler}
}