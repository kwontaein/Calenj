import axios from "axios";

export const joinSubScheduleApi =(subScheduleId:string)=>{
    return axios.post('api/joinSubSchedule',subScheduleId)
}