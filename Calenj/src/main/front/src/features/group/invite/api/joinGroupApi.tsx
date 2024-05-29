import axios, {AxiosResponse} from "axios";

export const joinGroupApi = (groupId:string):Promise<AxiosResponse<any>> =>{
    return axios.post('/api/joinGroup', {
        groupId: groupId
    })
}
