import axios, {AxiosResponse} from "axios";

export const getUserProfileApi = (userEmail:string):Promise<AxiosResponse<any>> =>{
     return axios.post(`/api/getProfile`, {userEmail: userEmail})

}