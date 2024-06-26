import axios, {AxiosError, AxiosResponse} from "axios";
import {RequestFriendResponse} from "../model/types";
import {jwtFilter} from "../../../../entities/authentication/jwt";

export const requestFriendApi = async (friendUserId:string) :Promise<RequestFriendResponse> => {
    return axios.post('/api/requestFriend', {friendUserId: friendUserId}) // 객체의 속성명을 'id'로 설정;
            .then((res:AxiosResponse) => {
                return res.data
            })
            .catch((error) => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.status) {
                    console.log(axiosError.response.status);
                    jwtFilter((axiosError.response.status).toString());
                }
            })
    }
