import axios from "axios";
import {date} from "yup";

export const updateScheduleApi = (id:string, startDate:Date, endDate:Date) =>{
    return axios.post('api/updateUserSchedule',{
        scheduleId:id,
        startDate:startDate,
        endDate: endDate,
    })
}