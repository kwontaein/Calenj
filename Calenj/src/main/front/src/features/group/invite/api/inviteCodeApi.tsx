import axios, {AxiosResponse} from "axios";

export const inviteCodeApi = (groupId:string):Promise<AxiosResponse<any>> =>{
    return axios.post('/api/inviteCode', {
        groupId: groupId,
        during: 7
    })
}