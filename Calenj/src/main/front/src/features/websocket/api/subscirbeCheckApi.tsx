import axios, {AxiosResponse} from "axios";

export const subscribeCheckApi = ():Promise<AxiosResponse<any>> =>{
    return axios.get(`/api/subscribeCheck`)
}