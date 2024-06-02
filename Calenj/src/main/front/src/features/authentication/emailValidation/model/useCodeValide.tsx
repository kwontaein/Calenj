import {checkAuthCodeApi} from "../api/checkAuthCodeApi";

export const useCodeValid = (code:string,email:string, updateValidState:()=>void)=>{

    if(!code){
        window.alert("인증코드를 입력해주세요.")
        return
    }
    checkAuthCodeApi(code,email).then((res)=>{
        if(res){
            window.alert("인증이 완료되었습니다.")
            updateValidState()
        }else{
            window.alert("인증코드가 일치하지 않습니다.")
        }
    })
}

