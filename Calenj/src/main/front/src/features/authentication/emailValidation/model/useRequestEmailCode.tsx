import {requestEmailCodeApi} from "../api/reqestEmailCodeApi";
import {useDispatch} from "react-redux";

export const useRequestEmailCode = () => {
    const dispatch = useDispatch();

    const requestEmailCode = async (email: string, isValid: boolean, updateValidState: () => void) => {
        if(!isValid) return
            requestEmailCodeApi(email)
                .then((res) => {
                    const {state} = res.data
                    //SUCCESS,UNKNOWN,RESEND_COUNT_MAX
                    if(state =="EMAIL_DUPLICATED"){
                        window.alert('중복된 이메일입니다.')
                    }else if(state === "UNKNOWN"){
                        window.alert('알 수 없는 오류입니다. 관리자에게 문의하세요.')
                    }else if(state ==="RESEND_COUNT_MAX"){
                        window.alert('인증횟수 초과입니다. 30분 후에 다시 시도해주세요.')
                    }else if(state ==="SUCCESS"){
                        window.alert("인증번호를 발급하였습니다.")
                        updateValidState();
                    }
            }).catch((err) => {
                console.error(err);
            });
    };

    return {requestEmailCode};
};