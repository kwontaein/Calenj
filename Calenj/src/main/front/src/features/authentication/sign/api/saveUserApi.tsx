import axios, {AxiosResponse} from "axios";
import {User} from "../model/types";

export const saveUserApi = (data: User):Promise<Object>=>{

    return axios.post('api/saveUser', data)
        .then((response: AxiosResponse<Object>) =>response.data)
        .catch((error) => Promise.reject(error));
}