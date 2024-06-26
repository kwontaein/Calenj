import axios from "axios";
import {UserDateEvent} from "../../../../../entities/reactQuery";

export const postDateEventApi = (saveEvent:UserDateEvent):void =>{
    axios.post("api/saveUserSchedule", saveEvent)
        .then(() => window.alert('일정이 생성되었습니다.'));
}