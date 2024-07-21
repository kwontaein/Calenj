import axios from "axios";
import {UserDateEvent} from "../../../../entities/reactQuery";

export const postDateEventApi = (saveEvent: UserDateEvent): Promise<void> => {
    return axios.post("api/saveUserSchedule", saveEvent)
}