import axios from "axios";

export const postShareScheduleApi = () =>{
    return axios.post('api/shareSchedule',{})
}