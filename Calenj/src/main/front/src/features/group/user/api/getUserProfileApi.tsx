import axios, {AxiosResponse} from "axios";

export const getUserProfileApi = (userId:string):Promise<AxiosResponse<any>> =>{
     return axios.post(`/api/getProfile`, {userId: userId})

}