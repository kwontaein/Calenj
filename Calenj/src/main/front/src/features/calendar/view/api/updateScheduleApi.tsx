import axios from "axios";
import {date} from "yup";
import {ReturnExtendedProps} from "../model/types";
import {Dictionary} from "@fullcalendar/core";

export const updateScheduleApi = (id:string, startDate:Date, endDate:Date ,extendProps:Dictionary) =>{
    return axios.post('api/updateUserSchedule',{
        scheduleId:id,
        startDate:startDate,
        endDate: endDate,
        extendProps:extendProps
    })
}