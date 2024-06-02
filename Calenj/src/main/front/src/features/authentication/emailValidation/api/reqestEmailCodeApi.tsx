import axios, {AxiosResponse} from "axios";
import {string} from "yup";


//이메일 인증요청 API
export const requestEmailCodeApi = async (email: string): Promise<AxiosResponse<any>> => {
        return axios.post('api/sendEmail', {email: email});
}

