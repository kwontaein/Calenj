import axios from "axios";


//이메일 인증요청 API
export const reqestEmailCodeApi = async (email:string , isValid:boolean): Promise<number|Error> => {
    return new Promise((resolve, reject) => {
        if (isValid) {
            axios.post('api/sendEmail', null, {
                params: {email: email},
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then((res) => {
                window.alert(res.data.state);
                resolve(res.data.code);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        }
    });
}

