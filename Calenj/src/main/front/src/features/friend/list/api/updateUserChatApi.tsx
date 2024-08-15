import axios from "axios";
import {UserChatInfo} from "../../../../entities/reactQuery";

export const updateUserChatApi = (chatInfo:UserChatInfo)=>{
    return axios.post('api/updateChat', {...chatInfo})
}