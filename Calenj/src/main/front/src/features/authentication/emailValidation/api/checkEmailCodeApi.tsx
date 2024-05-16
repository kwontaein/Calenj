import axios from "axios";
import {useDispatch} from "react-redux";
import {updateCodeValid} from "../../../../store/slice/EmailValidationSlice";



export const checkEmailCodeApi = async (code:string , email:string, onClose:()=>void): Promise<number|Error> => {

    return new Promise((resolve,reject)=>{
        axios.post('api/emailCodeValidation', null, {
            params: {
                validationCode: code,
                email: email
            },
        }).then((res)=>{
            resolve(res.data)
        }).catch((err)=> {
            console.error(err)
        })
    })
}
