import axios from "axios";

export const friendDeleteOrBanApi = (friendUserId:string, isBan:boolean):Promise<void> =>{
    return axios.post('api/deleteFriend',{friendUserId,isBan})
}