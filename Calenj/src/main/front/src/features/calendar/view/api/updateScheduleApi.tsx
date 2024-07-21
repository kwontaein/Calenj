import axios from "axios";
import {Dictionary} from "@fullcalendar/core";

export const updateScheduleApi = (id: string, start: Date, end: Date, oldStart: Date, extendedProps: Dictionary) => {
    return axios.post('api/updateUserSchedule', {
        id: id,
        start: start,
        end: end,
        oldStart: oldStart,
        extendedProps: extendedProps,
    })
}