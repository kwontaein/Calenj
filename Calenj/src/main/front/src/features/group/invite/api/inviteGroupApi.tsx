import axios, {AxiosResponse} from "axios";

export const inviteGroupApi = (inviteCode:string|undefined):Promise<AxiosResponse<any>> =>{
    return axios.post('/api/inviteGroup', {inviteCode: inviteCode}
    )
}