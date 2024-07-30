import axios from "axios";

export const createGroupScheduleApi = (groupScheduleTitle:string, startDate:Date, privacy:boolean, maxPeople:number):Promise<void> =>{
    return axios.post("api/createGroupSchedule",{groupScheduleTitle,startDate,privacy, maxPeople})
}