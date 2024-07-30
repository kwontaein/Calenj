import axios from "axios";

export const createGroupScheduleApi = (groupId: string, scheduleTitle: string, startDate: Date, privacy: boolean, maxPeople: number): Promise<void> => {
    return axios.post("api/createGroupSchedule", {groupId, scheduleTitle, startDate, privacy, maxPeople})
}