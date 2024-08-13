import axios from "axios";

export const cancelUserBanApi =()=>{
    return axios.post('api/cancle')
}