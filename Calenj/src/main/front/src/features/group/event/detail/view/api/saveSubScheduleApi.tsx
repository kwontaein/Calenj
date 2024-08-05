import axios from "axios";

export const saveSubScheduleApi = ()=>{
    return axios.post('api/createSubSchedule')
}