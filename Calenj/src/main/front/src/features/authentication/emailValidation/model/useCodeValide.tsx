import {checkAuthCodeApi} from "../api/checkAuthCodeApi";

export const useCodeValid = (code:string,email:string, updateValidState:()=>void)=>{
    checkAuthCodeApi(code,email).then((res)=>{
        if (res === 100) {
            window.alert("인증코드를 입력해주세요.")
        } else if (res === 200) {
            window.alert("인증이 완료되었습니다.")
            updateValidState()
        } else if (res === 500) {
            window.alert("인증코드가 일치하지 않습니다.")
        } else if (res === 300) {
            window.alert("인증 시간이 만료되었습니다. 인증번호를 재발급해주세요.")
        }
    })
}

