import axios from "axios";
import {Dictionary} from "@fullcalendar/core";

export const deleteScheduleApi = (id: string) => {
    return axios.post('api/deleteUserSchedule', {
        id: id,
    })
}