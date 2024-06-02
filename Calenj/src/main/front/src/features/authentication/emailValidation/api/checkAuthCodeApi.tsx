import axios from "axios";

export const checkAuthCodeApi = async (code:string , email:string): Promise<boolean|Error> => {

    return new Promise((resolve,reject)=>{
        axios.post('api/emailCodeValidation', {
                code: code,
                email: email
        }).then((res)=>{
            resolve(res.data)
        }).catch((err)=> {
            console.error(err)
            reject(err)
        })
    })
}
