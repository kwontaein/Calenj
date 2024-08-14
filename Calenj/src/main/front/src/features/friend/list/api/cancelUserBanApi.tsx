import axios from "axios";

export const cancelUserBanApi =(friendUserId:string):Promise<void>=>{
    return axios.post('api/cancelBan',{friendUserId})
}