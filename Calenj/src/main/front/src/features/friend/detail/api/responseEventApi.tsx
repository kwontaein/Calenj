import axios, {AxiosError, AxiosResponse} from "axios";
import {RequestFriendResponse} from "../../checkUserInput";
import {jwtFilter} from "../../../../entities/authentication/jwt";

export const responseEventApi = (friendUserId:string, isAccept:string):Promise<RequestFriendResponse> =>{
    return axios.post("/api/myResponse",{friendUserId, isAccept})
        .then((res:AxiosResponse)=>res.data)
        .catch((error)=>{
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.status) {
                console.log(axiosError.response.status);
                jwtFilter((axiosError.response.status).toString());
            }
        })
}