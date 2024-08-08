import axios from "axios";

export const joinSubScheduleApi =(subScheduleId:string):Promise<String>=>{
    console.log(subScheduleId)
    return axios.post('api/joinSubSchedule', {subScheduleId}).then((res)=>res.data)
}