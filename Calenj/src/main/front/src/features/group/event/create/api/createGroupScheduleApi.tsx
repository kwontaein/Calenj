import axios from "axios";

export const createGroupScheduleApi = (groupId:string,groupScheduleTitle:string, startDate:Date, privacy:boolean, maxPeople:number):Promise<void> =>{
    return axios.post("api/createGroupSchedule",{groupId,groupScheduleTitle,startDate,privacy, maxPeople})
}