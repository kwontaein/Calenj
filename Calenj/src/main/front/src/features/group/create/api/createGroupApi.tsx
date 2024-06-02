import axios, {AxiosResponse} from "axios";

export const createGroupApi = (groupTitle:string) :Promise<AxiosResponse<any>> =>{
    return  axios.post('/api/createGroup', {groupTitle: groupTitle})
}