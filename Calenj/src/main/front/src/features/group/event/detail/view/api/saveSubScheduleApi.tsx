import axios from "axios";
import {GroupSchedule} from "../../../../../../entities/reactQuery";

export const saveSubScheduleApi = (postScheduleData:GroupSchedule)=>{
    console.log(postScheduleData)
    return axios.post('api/createSubSchedule', postScheduleData)
}