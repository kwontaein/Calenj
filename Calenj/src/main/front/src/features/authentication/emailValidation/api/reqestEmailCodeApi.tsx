import axios from "axios";
import {string} from "yup";


//이메일 인증요청 API
export const requestEmailCodeApi = async (email: string, isValid: boolean): Promise<number | Error> => {
    return new Promise((resolve, reject) => {
        if (isValid) {
            axios.post('api/sendEmail', {email: email})
                .then((res) => {
                    window.alert(res.data.state);
                    resolve(res.data.code);
                }).catch((err) => {
                console.error(err);
                reject(err);
            });
        }
    });
}

