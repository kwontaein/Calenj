import axios, {AxiosError} from "axios";
import {jwtFilter} from "../../../../entities/authentication/jwt";

export const requestFriendApi = (userName:string, eventContent:string):Promise<void> =>{
    return axios.post('/api/saveRequest', {userName, eventContent})
            .then(()=>{
                window.alert('요청에 성공했습니다.')
            }).catch((error)=>{
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.status) {
                    console.log(axiosError.response.status);
                    jwtFilter((axiosError.response.status).toString());
            }
    })
}