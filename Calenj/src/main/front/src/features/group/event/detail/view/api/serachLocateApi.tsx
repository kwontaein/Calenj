import axios, {AxiosError} from "axios";
import {jwtFilter} from "../../../../../../entities/authentication/jwt";
import {LocalItem, NaverSearchResponse} from "../model/types";




export const searchLocateApi = (searchName:string):Promise<LocalItem[]>=>{
    return axios.post('api/searchLocate', {searchName})
        .then((res)=>res.data.items)
        .catch((error)=>{
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.status) {
                console.log(axiosError.response.status);
                jwtFilter((axiosError.response.status).toString());
            }
            return null;
            }
        )
}