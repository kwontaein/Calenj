import {reqestEmailCodeApi} from "../api/reqestEmailCodeApi";
import {getExpirationTimeApi} from "../../codeValidTime";
import {useDispatch} from "react-redux";
import {updateToken} from "../../../../../store/slice/EmailValidationSlice";

export const requestEmailCode = (email:string,isValid:boolean,updateValidState:()=>void) =>{
    const dispatch = useDispatch();


    reqestEmailCodeApi(email,isValid).then((res)=>{
        if(res!==200) return;
        updateValidState();
        getExpirationTimeApi().then((res)=>{
            if(typeof res === "number"){
                dispatch(updateToken({tokenId: "tokenUUID", validateTime: res}))
            }
        })
    })
}