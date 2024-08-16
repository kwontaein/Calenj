import axios from "axios";
import {ShareList} from "../model/types";

export const postShareScheduleApi = (sharedPositionRequests:ShareList[],copyAble:boolean,scheduleId:string, ) =>{
    return axios.post('api/shareSchedule',{sharedPositionRequests, copyAble, scheduleId}).then(()=>{
        window.alert('일정 공유를 완료했습니다.')
    })
}