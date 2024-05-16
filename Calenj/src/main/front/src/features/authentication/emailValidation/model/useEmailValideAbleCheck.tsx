import {useState} from "react";
import {EmailTokenState} from "../../../../store/slice/EmailValidationSlice";
import {ValidAbleMenagement} from "./types"


//모달관련 model
export const useEmailValideAbleCheck = (emailToken:EmailTokenState):ValidAbleMenagement =>{
    //이메일 발급 이후 input을 잠그기 위한 State(이메일 인증번호 발급만하고 이메일 수정하는 거 막음)
    const [eamilInputLimit, setEamilInputLimit] = useState<boolean>(false);
    //인증번호 발급여부 (한 번 발급하면 재발급 UI로 변경)
    const [validation, setValidation] = useState<boolean>(false);
    //이메일 인증 컴포넌트를 마운트하기 위한 State
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const closeModal = () => {
        setShowAlert(false);
    };

    //
    const updateValidAble = ()=>{
        const currentTime = Date.now();
        //남은 시간 계산 (밀리초 단위)
        const enableInputEmailTime = emailToken.validateTime - currentTime;

        //만약 토큰이 아직 유효하면 이메일 input 수정불가
        if (enableInputEmailTime > 0) {
            setEamilInputLimit(true);
        } else {
            setEamilInputLimit(false);
        }
    }

    //이메일 인증코드가 발급되면 ture로 전환
    const updateEmailValidateState = () =>{
        setValidation(true);
        setShowAlert(true);
    }

    return{showAlert:showAlert, eamilInputLimit:eamilInputLimit, validation:validation, closeModal:closeModal, updateValidAble:updateValidAble , updateEmailValidateState:updateEmailValidateState}
}