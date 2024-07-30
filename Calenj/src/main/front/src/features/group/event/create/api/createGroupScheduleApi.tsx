import axios from "axios";

export const createGroupScheduleApi = (scheduleGroup: string, groupScheduleTitle: string, startDate: Date, privacy: boolean, maxPeople: number): Promise<void> => {
    return axios.post("api/createGroupSchedule", {scheduleGroup, groupScheduleTitle, startDate, privacy, maxPeople})
}