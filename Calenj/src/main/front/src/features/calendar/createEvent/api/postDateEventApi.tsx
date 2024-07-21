import axios from "axios";
import {UserDateEvent} from "../../../../entities/reactQuery";

export const postDateEventApi = (saveEvent: UserDateEvent, mode: string): Promise<void> => {
    return axios.post("api/saveUserSchedule", saveEvent)
        .then(() => {
            if (mode === "create") {
                window.alert('일정이 생성되었습니다.')
            } else {
                window.alert('일정이 수정되었습니다.')
            }
        });
}